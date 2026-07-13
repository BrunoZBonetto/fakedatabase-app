# Análise de Viabilidade — Geração Simultânea de Bases de Dados Relacionadas

---

## 1. Resumo Executivo

O Fake Data Generator é um aplicativo React+TypeScript que gera dados fictícios no navegador, sem backend. Hoje ele produz **uma única tabela por vez** — o usuário seleciona campos, escolhe um template e exporta. O objetivo desta análise é avaliar a viabilidade de gerar **duas ou mais tabelas simultaneamente com chaves estrangeiras coerentes** (ex: Pessoas → Pedidos).

**Classificação de viabilidade: Viável com refatorações moderadas.**

O motor de geração (`FakeDataGenerator`) é mono-tabelaque gera uma `Record` por vez, mas sua arquitetura interna — baseada em `ctx` (contexto compartilhado) e correlações — é naturalmente extensível. A mudança principal não é no motor, mas na **orquestração**: um controlador que gera tabelas em ordem de dependência, preserva os IDs gerados e injeta-os como chaves estrangeiras na tabela filha.

O maior custo está na UI (seleção de múltiplos templates, configuração de relacionamentos) e na exportação multi-tabela. O motor de geração requer mudanças pontuais e de baixo risco.

**Estimativa para MVP (2 tabelas, 1:N): 8–12 dias úteis, complexidade média.**

---

## 2. Entendimento do Projeto Atual

### 2.1 Stack e Arquitetura

| Camada | Tecnologia | Arquivo-chave |
|---|---|---|
| Framework | React 18 (SPA client-side) | `src/main.tsx`, `src/App.tsx` |
| Linguagem | TypeScript 5.6 | `tsconfig.json` |
| Build | Vite 5.4 | `vite.config.ts` |
| UI | CSS vanilla (sem framework) | `src/index.css` (1078 linhas) |
| Estado | React hooks (useState, useRef, useCallback) | `src/components/DataGenerator.tsx` |
| DnD | @dnd-kit/core + sortable | `src/components/SortableFields.tsx` |
| Exportação | xlsx (SheetJS), papaparse, file-saver | `src/utils/exporters.ts` |
| Testes | Vitest + @testing-library/react | `src/test/generator.test.ts` (50 linhas, 6 testes) |
| Worker | Web Worker nativo do browser | `src/engine/generator.worker.ts` |
| Analytics | Google Analytics (gtag) | `src/utils/analytics.ts` |
| Deploy | Netlify (SPA estática) | `netlify.toml` |
| PWA | vite-plugin-pwa (service worker) | `dist/sw.js` |

**Não existe backend, API, banco de dados, fila ou processamento server-side.** Tudo roda no browser.

### 2.2 Modelo Atual de Templates

**Definição:** `src/templates/presets.ts` — 15 presets como objetos `{ fields: string[] }`, sem metadados adicionais.

```
pessoaFisica: { fields: ['id', 'fullName', 'cpf', 'birthDate', 'email', 'phone', 'fullAddress', 'profession'] }
pedido:       { fields: ['id', 'uuid', 'fullName', 'email', 'product', 'quantity', 'price', 'amount', 'paymentMethod', 'status', 'date'] }
empresa:      { fields: ['id', 'company', 'cnpj', 'sector', 'phone', 'email', 'fullAddress', 'website'] }
funcionario:  { fields: ['id', 'fullName', 'cpf', 'email', 'phone', 'company', 'position', 'area', 'seniority', 'salary', 'education'] }
produto:      { fields: ['id', 'uuid', 'product', 'productCategory', 'price', 'quantity', 'rating', 'status', 'sentence'] }
... (15 no total)
```

**Campos suportados:** ~130 campos nativos + campos customizados via `CustomField` (11 tipos SQL). Campos são identificados por strings camelCase (`'firstName'`, `'email'`). Não existe metadado declarativo de tipo, unicidade, ou referência.

**Dicionários:** 13 sub-dicionários por locale (names, address, company, finance, profession, categories, person, education, health, entertainment, food, animal, fashion), mapeados via `DictSet` em `src/engine/generator.ts`.

### 2.3 Fluxo de Geração

```
1. Usuário seleciona template (ou campos individuais)
2. Define quantidade (1-5000), nullRate (0-50%), errorRate (0-50%)
3. Clica "Gerar"
4. Se count < 1000: gera em main thread (setTimeout 10ms)
   Se count ≥ 1000: spawna Web Worker, gera em chunks de 1000
5. Generator: const ctx = { countryKey, stateData, cityData, ... }
   → ~50 blocos de correlação preenchem ctx
   → Para cada campo: generateField(field, ctx) → valor
   → applyInjection(record) → nullRate/errorRate
6. Dados → OutputPreview (renderiza tabela/código)
7. Usuário exporta no formato desejado
```

**Geração é aleatória a cada execução** — não usa seed determinística. IDs são auto-incrementais por instância do generator (counter privado).

**Limites:** MAX_RECORDS = 5000. Worker processa em chunks de 1000.

### 2.4 Fluxo de Exportação

| Formato | Função | Suporte multi-tabela? |
|---|---|---|
| JSON | `JSON.stringify()` inline | Não |
| CSV | Concatenação manual de linhas | Não |
| SQL | `toSQL()` em `exporters.ts` | Não (CREATE TABLE + INSERT únicos) |
| XML | `toXML()` em `exporters.ts` | Não |
| YAML | `toYAML()` em `exporters.ts` | Não |
| Excel | `toXLSX()` via SheetJS | Não (aba única) |

**Download:** Blob → createObjectURL → <a>.click() → revokeObjectURL.

**Não existe:** suporte a ZIP, múltiplas abas XLSX, múltiplos downloads, nem SQL com chaves estrangeiras.

### 2.5 UX Atual

**Layout:** Sidebar (templates + campos + ordem) → Main (controles + output + campos customizados).

**Componentes-chave:**
- `DataGenerator.tsx` — orquestrador principal (256 linhas, 9 states)
- `TemplateSelector.tsx` — grid 2-col de 15 presets (41 linhas)
- `FieldSelector.tsx` — accordion de 19 categorias com checkboxes (127 linhas)
- `OutputPreview.tsx` — tabela paginada + 6 formatos de exportação (279 linhas)
- `CustomFieldsEditor.tsx` — editor de colunas customizadas (193 linhas)

**Fluxo é single-table por natureza:** um conjunto de campos, um count, um output. Não existe conceito de "tabela pai" ou "tabela filho".

---

## 3. Problema de Negócio e Oportunidade

### 3.1 Problema Resolvido

Hoje, um desenvolvedor criando um banco de dados de teste para um sistema de e-commerce precisa:

1. Gerar uma tabela de "Clientes" e exportar como CSV
2. Gerar uma tabela de "Pedidos" e exportar como CSV
3. Manualmente ajustar os IDs para que cada pedido referencie um cliente válido
4. Verificar que não existem chaves órfãs
5. Repetir para Categorias → Produtos → Itens do Pedido

Esse processo é **manual, propenso a erros e não-escalável**. O recurso proposto elimina etapas 3-5 automaticamente.

### 3.2 Valor por Perfil de Usuário

| Perfil | Dor atual | Valor do recurso |
|---|---|---|
| Desenvolvedor full-stack | Cria seeds manuais para bancos relacionais | Gera datasets prontos com integridade referencial |
| QA/Testador | Precisa de dados coerentes para testes E2E | Dados com FKs válidas para testes de integração |
| Analista de dados | Combina planilhas manualmente no Excel | Exporta dados prontos para Power BI, SQL, etc. |
| Consultor/Demo | Apresenta sistemas com dados realistas | Gera demos completas em segundos |
| Estudante | Aprende SQL com dados isolados | Pratica JOINs com dados reais |

### 3.3 Casos de Uso Prioritários

**MVP (Fase 1):**
- Pessoas (100) → Pedidos (500) — cada pedido com `pessoa_id` válido
- Clientes (50) → Endereços (150) — cada endereço com `cliente_id` válido

**Fase 2:**
- Categorias (20) → Produtos (200) — cada produto com `categoria_id`
- Empresas (30) → Funcionários (150) — cada funcionário com `empresa_id`
- Pedidos (100) → Itens do Pedido (500) → Produtos (200) — cadeia 3 níveis

**Fase 3 (fora de MVP):**
- Relações N:N (ex: Pedidos ↔ Produtos via tabela pivô)
- Presets de conjuntos relacionais pré-configurados
- Regras de negócio customizáveis (ex: "todo pedido deve ter status diferente de 'Cancelado' se amount > 1000")

### 3.4 Definição de Sucesso

| Métrica | Target |
|---|---|
| Usuários que usam geração relacional / total de gerações | > 15% após 3 meses |
| Exportações com zero FKs órfãs | 100% |
| Tempo de geração para 1000+1000 registros | < 5 segundos |
| Taxa de erro na geração relacional | < 0.1% |
| Repetição de uso (gerações relacional/mês/usuário) | > 3 |

### 3.5 Riscos de Produto

| Risco | Severidade | Mitigação |
|---|---|---|
| Inferência incorreta de relacionamento | Alta | Confirmação obrigatória do usuário antes de gerar |
| Ambiguidade entre campos (ex: `id` em ambas as tabelas) | Média | Naming explícito: `pessoa_id` na tabela filho |
| Usuário não entende cardinalidade | Média | UI clara com diagrama visual simples |
| Dados incompatíveis com regras de negócio | Baixa | Correlações existentes já tratam isso por locale |
| Exportações difíceis de usar em ferramentas externas | Média | SQL com INSERTs na ordem correta; XLSX multi-aba |

---

## 4. Casos de Uso e Escopo

### Matriz de Escopo

| Funcionalidade | MVP | Fase 2 | Fase 3 |
|---|---|---|---|
| 2 tabelas, 1:N | Sim | — | — |
| N tabelas, grafo de dependências | — | Sim | — |
| Configuração explícita de FK | Sim | Sim | Sim |
| Inferência automática de FK | — | Sim (com confirmação) | Sim (com confiança) |
| Exportação multi-arquivo (ZIP) | — | Sim | Sim |
| XLSX multi-aba | — | Sim | Sim |
| SQL com ordem de INSERTs | — | Sim | Sim |
| Seed reproduzível | — | Sim | Sim |
| Relações 1:1 | — | — | Sim |
| Relações N:N | — | — | Sim |
| Editor visual de relacionamentos | — | — | Sim |
| Presets de conjuntos relacionais | — | — | Sim |
| Validação de integridade pós-geração | Sim | Sim | Sim |

---

## 5. Viabilidade Técnica

### Classificação Geral: **Viável com refatorações moderadas**

### 5.1 Geração de Dados com Relacionamentos

**Viável.** O motor gera registros via `generateOne()` que retorna um `Record<string, unknown>`. Para relações 1:N:

1. Gerar tabela pai → extrair IDs
2. Para cada registro filho, sortear um ID pai e injetá-lo antes da geração
3. O generator já aceita campos customizados — a FK pode ser injetada como campo customizado com valores pré-definidos

**Bloqueio:** Nenhum. O `generateOne()` aceita `ctx` compartilhado e pode receber uma FK pré-definida.

### 5.2 Identificação Automática de Chaves Estrangeiras

**Viável com trabalho adicional.** O sistema atual não possui metadados de FK. Estratégia recomendada:

- **Alta confiança:** Campo filho com padrão `<templatePai>_id` (ex: `pessoa_id` quando template pai é `pessoaFisica`)
- **Média confiança:** Similaridade semântica normalizada (via `normalizeColumnName` existente)
- **Baixa confiança:** Exigir configuração manual

O `normalizeColumnName()` e o `SEMANTIC_MAP` já resolvem semelhanças de nomes — podem ser reutilizados para inferência de FK.

### 5.3 Geração em Ordem Correta

**Viável.** Requer um orquestrador que:
1. Analisa dependências (grafo acíclico direcionado)
2. Ordena topologicamente
3. Gera na ordem: pais → filhos → netos

A implementação atual já gera registros sequencialmente. A mudança é no nível de **orquestração**, não no motor.

### 5.4 Cardinalidades

| Tipo | Viabilidade | Complexidade |
|---|---|---|
| 1:N | Alta | Baixa — sortear FK pai para cada filho |
| 1:1 | Alta | Baixa — mapear 1:1 por índice |
| N:N | Média | Média — requer tabela pivô + 2 FKs |

**MVP:** 1:N apenas. Demais para fases futuras.

### 5.5 Exportação de Múltiplas Entidades

**Viável.** SheetJS (`xlsx`) suporta múltiplas abas nativamente. ZIP pode ser feito com `JSZip` (ou download manual de múltiplos arquivos). SQL pode concatenar CREATEs e INSERTs na ordem topológica.

### 5.6 Escalabilidade e Limites

O limite atual é 5000 registros por tabela. Para 2 tabelas de 5000 = 10.000 registros totais, o Worker já suporta (processa em chunks de 1000). **Sem bloqueio.**

### 5.7 Consistência e Integridade Referencial

**Viável.** A abordagem é:
1. Gerar tabela pai → coletar todos os IDs
2. Gerar tabela filho → para cada registro, sortear um ID pai da lista coletada
3. Validar pós-geração: verificar que todos os FKs apontam para IDs existentes

Não requer mudanças no motor — a FK é injetada no `ctx` ou como campo customizado.

### 5.8 Reprodutibilidade por Seed

**Não suportado atualmente.** O generator usa `Math.random()`. Para MVP, seed não é obrigatória. Para Fase 2, pode ser adicionada via `mulberry32` ou similar substituindo `Math.random`.

### 5.9 Compatibilidade com Formatos de Exportação

| Formato | Mudança necessária |
|---|---|
| JSON | Wrapper: `{ pessoas: [...], pedidos: [...] }` |
| CSV | Dois arquivos separados |
| SQL | CREATE TABLE × 2, INSERTs na ordem de dependência |
| XML | Dois elementos raiz ou wrapper |
| YAML | Dois documentos ou wrapper |
| XLSX | Duas abas (uma por tabela) — **já suportado pelo SheetJS** |

### 5.10 Testabilidade

O teste atual tem apenas 6 casos em 50 linhas. A geração relacional precisa de:
- Validação de integridade referencial (zero FKs órfãs)
- Validação de unicidade de PKs
- Validação de cardinalidade (N filhos por pai)

Os testes existentes usam `vitest` com asserts simples — o padrão é extensível.

---

## 6. Arquitetura e Abordagem Recomendada

### 6.1 Modelo de Domínio Sugerido

```typescript
// Relação entre duas entidades
interface EntityRelation {
  parentTemplateKey: string;    // ex: 'pessoaFisica'
  childTemplateKey: string;     // ex: 'pedido'
  parentField: string;          // ex: 'id' (PK do pai)
  childField: string;           // ex: 'pessoa_id' (FK no filho)
  cardinality: '1:N' | '1:1';  // MVP: apenas 1:N
}

// Configuração de uma entidade no conjunto relacional
interface RelationalEntity {
  templateKey: string;
  recordCount: number;
  fieldOverrides?: string[];    // campos extras/removidos em relação ao template
  customFields?: CustomField[];
}

// Configuração completa de uma geração relacional
interface RelationalConfig {
  entities: RelationalEntity[];
  relations: EntityRelation[];
  nullRate: number;
  errorRate: number;
  locale: string;
}
```

### 6.2 Metadados de Template — Obrigatórios no MVP

| Propriedade | Obrigatória? | Justificativa |
|---|---|---|
| `primaryKeyField` | Sim | Identificar qual campo é a PK (`'id'` por padrão) |
| `foreignKeyPattern` | Sim (ou inferido) | Padrão de naming para auto-detecção: `<template>_id` |
| `isPrimaryKey` | Não (fase futura) | Metadado declarativo no template |
| `isForeignKey` | Não (fase futura) | Metadado declarativo no template |
| `isUnique` | Não (fase futura) | Para constraints de unicidade |
| `nullable` | Não (fase futura) | Para colunas opcionais |

**Para o MVP**, os templates existentes já têm `id` como primeiro campo — isso serve como PK por convenção. O FK pode ser inferido por naming (`pessoa_id`, `cliente_id`, etc.) ou configurado manualmente.

### 6.3 Orquestração da Geração

```
RelationalGenerator
  |
  |-- analyzeDependencies(config) → topologicalSort()
  |     输入: EntityRelation[]
  |     输出: Entity[] (ordenados)
  |     Ciclo detectado? → Erro
  |
  |-- generateAll(config) → Map<string, Record[]>
  |     Para cada entidade na ordem topológica:
  |       1. Se é entidade raiz (sem dependências):
  |          - Gerar normalmente via FakeDataGenerator
  |          - Coletar PKs gerados
  |       2. Se é entidade filho:
  |          - Para cada registro a gerar:
  |            - Sortear um PK pai da lista de PKs coletados
  |            - Injetar no ctx antes de generateOne()
  |          - Gerar via FakeDataGenerator
  |     Retornar Map<templateKey, records[]>
  |
  |-- validateIntegrity(results, relations) → ValidationResult
  |     Verificar: zero FKs órfãs, PKs únicos, cardinalidade esperada
```

### 6.4 Ordem de Geração

Para `A → B → C`:
1. Gerar A (100 registros) → coletar `ids_A = [1..100]`
2. Gerar B (500 registros) → para cada, sortear `id_A` de `ids_A` → coletar `ids_B = [1..500]`
3. Gerar C (200 registros) → para cada, sortear `id_B` de `ids_B`

**Detecção de ciclos:** Usar DFS no grafo de dependências. Se ciclo encontrado, mostrar erro ao usuário. Para MVP com 2 tabelas, ciclo é impossível.

### 6.5 Exportação

| Alternativa | Prós | Contras | Recomendação MVP |
|---|---|---|---|
| Downloads individuais | Simples | Usuário baixa N arquivos | Não |
| ZIP com 1 arquivo por tabela | Compacto, organizado | Requer lib JSZip | Sim (Fase 2) |
| XLSX multi-aba | 1 arquivo, visual no Excel | Requer modificação no toXLSX | Sim (Fase 2) |
| SQL multi-tabela | Natural para dev DB | Requer ordem de INSERTs | Sim (MVP) |

**MVP:** Exportação SQL com 2 CREATE TABLEs + INSERTs na ordem correta.
**Fase 2:** XLSX multi-aba + ZIP.

### 6.6 Experiência do Usuário — Fluxo Proposto

```
Tela 1: Seleção de Entidades
  ┌──────────────────────────────────────┐
  │  Geração Relacional de Dados         │
  │                                      │
  │  Entidade 1 (Pai):                   │
  │  [Template: Pessoa Física ▾]         │
  │  [Registros: 100___]                │
  │                                      │
  │  Entidade 2 (Filho):                 │
  │  [Template: Pedido ▾]               │
  │  [Registros: 500___]                │
  │                                      │
  │  [+ Adicionar entidade]              │
  │                                      │
  └──────────────────────────────────────┘

Tela 2: Configuração de Relacionamento
  ┌──────────────────────────────────────┐
  │  Relacionamento Detectado:           │
  │                                      │
  │  Pedido.pessoa_id → Pessoa.id        │
  │  Cardinalidade: 1:N                  │
  │  (Muitos pedidos pertencem a 1 pessoa)│
  │                                      │
  │  [✅ Confirmar] [✏️ Editar]          │
  │                                      │
  │  ⚠️ Se não detectado:               │
  │  "Selecione o campo FK manualmente"  │
  │  [Campo FK: _________ ▾]            │
  │                                      │
  └──────────────────────────────────────┘

Tela 3: Resumo e Geração
  ┌──────────────────────────────────────┐
  │  Resumo:                             │
  │  • Pessoa: 100 registros (PK: id)    │
  │  • Pedido: 500 registros (FK: id →   │
  │    Pessoa.id)                        │
  │                                      │
  │  [⚡ Gerar Dados]                    │
  └──────────────────────────────────────┘

Tela 4: Output (modificada)
  ┌──────────────────────────────────────┐
  │  [Pessoa] [Pedido]  ← tabs          │
  │                                      │
  │  Tabela paginada da entidade ativa   │
  │                                      │
  │  Exportar:                           │
  │  [SQL] [JSON] [XLSX] [CSV] [ZIP]    │
  └──────────────────────────────────────┘
```

### 6.7 Validações

**Antes da geração:**
- Pelo menos 2 entidades selecionadas
- Cada entidade com pelo menos 1 campo
- Pelo menos 1 relacionamento configurado
- Templates incompatíveis (ex: dois templates idênticos) → advertência
- Campo FK existe na tabela filho
- Campo PK existe na tabela pai

**Após a geração:**
- Zero FKs órfãs (cada FK aponta para um ID válido)
- PKs únicos na tabela pai
- Cardinalidade dentro do esperado (ex: cada pai tem 1-50 filhos)
- Nenhum campo com `[Campo desconhecido: ...]`

**Template pai com zero registros:**
- Se pai = 0 e filho > 0 → erro: "Não é possível gerar filhos sem registros pai"

---

## 7. Proposta de MVP

### 7.1 Escopo

| Item | Incluído | Excluído |
|---|---|---|
| Entidades | 2 templates | 3+ templates |
| Cardinalidade | 1:N | 1:1, N:N |
| Configuração de FK | Manual (usuário seleciona campo FK) | Inferência automática |
| Exportação | SQL multi-tabela | XLSX multi-aba, ZIP, CSV multi-arquivo |
| Seed | Não | Determinística |
| Validação | Integridade referencial pós-geração | Regras de negócio customizáveis |
| UI | Tela de configuração simples | Editor visual, diagrama |

### 7.2 Estratégia de Inferência de FK — Recomendação

**Configuração explícita com sugestão automática.** Trade-offs:

| Abordagem | Prós | Contras |
|---|---|---|
| Somente explícita | Sem erros de inferência | Usuário precisa saber o que fazer |
| Inferência por naming | UX mais fluida | Pode inferir errado (ambiguidade) |
| **Explícita + sugestão** | **Melhor dos dois mundos** | **Leve complexidade adicional** |

**Recomendação para MVP:** O sistema sugere automaticamente baseado no naming (`<template>_id`), mas o usuário **sempre confirma** antes de gerar. Se a sugestão for ambígua ou inexistente, o usuário seleciona manualmente.

### 7.3 Mudanças no Código

#### Arquivos Novos

| Arquivo | Propósito |
|---|---|
| `src/engine/relational-generator.ts` | Orquestrador de geração relacional |
| `src/components/RelationalConfig.tsx` | UI de configuração de entidades e relacionamentos |
| `src/components/RelationalOutput.tsx` | Output com abas por entidade |
| `src/utils/relational-exporters.ts` | Exportadores multi-tabela (SQL, XLSX multi-aba) |

#### Arquivos Modificados

| Arquivo | Mudanças |
|---|---|
| `src/components/DataGenerator.tsx` | Modo "relacional" com toggle, novo estado `relationalConfig` |
| `src/templates/presets.ts` | Adicionar `primaryKey` opcional (default: `'id'`) |
| `src/utils/exporters.ts` | `toXLSX()` aceitar múltiplas abas |
| `src/index.css` | Estilos para nova UI relacional |
| `src/i18n/*.ts` | Novos labels para UI relacional (6 arquivos) |

#### Arquivos NÃO Modificados

| Arquivo | Razão |
|---|---|
| `src/engine/generator.ts` | Motor permanece intacto — orquestração é externa |
| `src/engine/generator.worker.ts` | Worker pode ser reutilizado para cada entidade |
| `src/engine/correlations/*` | Correlações permanecem intactas |
| `src/dictionaries/*` | Dicionários não mudam |

### 7.4 Estimativa MVP

| Etapa | Horas | Dias Úteis |
|---|---|---|
| Descoberta e desenho técnico | 4h | 0.5 |
| `relational-generator.ts` (orquestrador) | 8h | 1 |
| `RelationalConfig.tsx` (UI de config) | 8h | 1 |
| `RelationalOutput.tsx` (output multi-entidade) | 8h | 1 |
| `relational-exporters.ts` (SQL multi-tabela) | 6h | 0.75 |
| Integração no DataGenerator.tsx | 6h | 0.75 |
| i18n (labels novos) | 4h | 0.5 |
| CSS (estilos novos) | 4h | 0.5 |
| Testes unitários | 6h | 0.75 |
| Testes de integração | 4h | 0.5 |
| QA e correções | 6h | 0.75 |
| **Total** | **64h** | **8 dias úteis** |

---

## 8. Fluxo de Experiência do Usuário

### 8.1 Estado Atual

```
Header [Logo] [Sponsor] [Locale▾] [☀️/🌙]
────────────────────────────────────────────
Sidebar                    │ Main
 TemplateSelector           │ Controls [Count] [Null%] [Error%] [Gerar]
 SortableFields             │ AdUnit
 FieldSelector              │ OutputPreview [Table|JSON|CSV|SQL|XML|YAML] [Excel] [Copy] [Download]
                            │ CustomFieldsEditor
```

### 8.2 Estado Proposto (MVP)

```
Header [Logo] [Sponsor] [Locale▾] [☀️/🌙]
────────────────────────────────────────────
Sidebar                    │ Main
 [Modo: Simples|Relacional]│ Controls [Count] [Null%] [Error%] [Gerar]
 TemplateSelector           │ AdUnit
 SortableFields             │ RelationalConfig (quando modo=relacional)
 FieldSelector              │   ├─ Entidade Pai: [Template▾] [Count]
                            │   ├─ Entidade Filho: [Template▾] [Count]
                            │   ├─ Relacionamento: [PK▾] → [FK▾]
                            │   └─ [Confirmar]
                            │ OutputPreview [Pessoa|Pedido tabs] [SQL|JSON|XLSX|CSV|ZIP]
                            │ CustomFieldsEditor
```

### 8.3 Estados de Erro

| Estado | Mensagem | Ação |
|---|---|---|
| Apenas 1 entidade | "Adicione pelo menos 2 entidades" | Desabilitar botão Gerar |
| FK não selecionado | "Configure o campo de referência" | Impedir geração |
| FK não existe no filho | "Campo '{fk}' não encontrado no template filho" | Destacar campo com erro |
| Pai = 0 registros, filho > 0 | "Registros pai são necessários para gerar filhos" | Impedir geração |
| Templates incompatíveis | "Templates não possuem campos relacionáveis" | Advertência (não impede) |
| Ciclo detectado | "Relacionamento circular detectado" | Impedir geração (futuro) |

---

## 9. Estratégia de Exportação

### 9.1 MVP — SQL Multi-Tabela

```sql
-- Gerado por Fake Database — Modo Relacional
-- Relacionamento: Pedido.pessoa_id → Pessoa.id

CREATE TABLE pessoa (
  id INT(10) PRIMARY KEY,
  full_name VARCHAR(255),
  cpf VARCHAR(14),
  email VARCHAR(255),
  phone VARCHAR(20)
);

CREATE TABLE pedido (
  id INT(10) PRIMARY KEY,
  pessoa_id INT(10),
  product VARCHAR(255),
  quantity INT(10),
  price DECIMAL(10,2),
  amount DECIMAL(10,2),
  FOREIGN KEY (pessoa_id) REFERENCES pessoa(id)
);

-- Dados da tabela: pessoa
INSERT INTO pessoa (id, full_name, cpf, email, phone) VALUES
(1, 'Miguel Silva', '123.456.789-00', 'silva.miguel@gmail.com', '(11) 91234-5678'),
...

-- Dados da tabela: pedido
INSERT INTO pedido (id, pessoa_id, product, quantity, price, amount) VALUES
(1, 47, 'Notebook Pro', 2, 4500.00, 9000.00),
(2, 47, 'Mouse Wireless', 1, 89.90, 89.90),
...
```

### 9.2 Fase 2 — XLSX Multi-Aba

```typescript
// SheetJS já suporta:
const wb = XLSX.utils.book_new();
const wsPessoa = XLSX.utils.json_to_sheet(pessoaData);
const wsPedido = XLSX.utils.json_to_sheet(pedidoData);
XLSX.utils.book_append_sheet(wb, wsPessoa, 'Pessoa');
XLSX.utils.book_append_sheet(wb, wsPedido, 'Pedido');
XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
```

### 9.3 Fase 2 — ZIP

Requer adicionar `jszip` como dependência (~45KB gzipped). Cada tabela = 1 arquivo dentro do ZIP.

---

## 10. Riscos, Limitações e Mitigação

| Risco | Probabilidade | Impacto | Mitigação |
|---|---|---|---|
| Usuário configura FK incorreta | Alta | Dados inválidos | Validação pós-geração + preview antes de exportar |
| Naming ambíguo na inferência automática | Média | Confusão | MVP usa configuração explícita |
| Performance com 2×5000 registros | Baixa | UI travada | Worker já processa em chunks; 2 workers paralelos possíveis |
| SheetJS não suporta FKs em SQL | N/A | N/A | SQL é gerado por código próprio (toSQL), não pelo SheetJS |
| Dicionários PT misturados com EN em modo World | Média | Dados inconsistentes | Cada entidade pode ter locale independente |
| Testes insuficientes | Alta | Bugs em produção | Meta: cobrir relacional com 10+ testes |

---

## 11. Estimativa de Esforço

### Premissas

- 1 desenvolvedor full-time
- Conhecimento prévio do códigobase (este análise)
- Sem dependências externas bloqueantes
- UI em CSS vanilla (sem lib de componentes)
- Sem necessidade de backend

### Cenário A — MVP Enxuto

| Item | Escopo |
|---|---|
| Templates | 2 (Pessoa → Pedido) |
| Cardinalidade | 1:N |
| Config FK | Manual (usuário seleciona) |
| Exportação | SQL multi-tabela apenas |
| UI | Modo toggle Simples/Relacional |
| Testes | Unitários básicos |
| Seed | Não |

| Etapa | Horas |
|---|---|
| Desenho técnico | 4h |
| relational-generator.ts | 6h |
| UI configuração | 6h |
| Output multi-tabela | 6h |
| Exportação SQL | 4h |
| Integração | 4h |
| Testes | 4h |
| QA | 4h |
| **Total** | **38h (~5 dias úteis)** |

| Meta-dado | Valor |
|---|---|
| Complexidade | Média |
| Confiança | Alta |
| Risco principal | UI (decisões de design) |

### Cenário B — Versão Recomendada

| Item | Escopo |
|---|---|
| Templates | Múltiplos (grafo de dependências) |
| Cardinalidade | 1:N |
| Config FK | Inferência + confirmação manual |
| Exportação | SQL + XLSX multi-aba + ZIP |
| UI | Tela dedicada com 4 passos |
| Testes | Unitários + integração |
| Seed | Sim (mulberry32) |

| Etapa | Horas |
|---|---|
| Desenho técnico | 6h |
| relational-generator.ts | 10h |
| UI configuração | 12h |
| Output multi-entidade | 10h |
| Exportação (SQL + XLSX + ZIP) | 12h |
| Integração | 8h |
| i18n | 4h |
| CSS | 4h |
| Testes unitários | 8h |
| Testes integração | 6h |
| QA e correções | 8h |
| **Total** | **88h (~11 dias úteis)** |

| Meta-dado | Valor |
|---|---|
| Complexidade | Média-Alta |
| Confiança | Média |
| Risco principal | Inferência automática + exportação ZIP |

### Cenário C — Versão Avançada

| Item | Escopo |
|---|---|
| Templates | Ilimitados (grafo completo) |
| Cardinalidade | 1:1, 1:N, N:N |
| Config FK | Inferência + editor visual |
| Exportação | SQL + XLSX + ZIP + CSV + JSON + XML + YAML |
| UI | Editor visual de relacionamentos (nós e arestas) |
| Testes | Cobertura completa |
| Seed | Sim |
| Presets | Conjuntos relacionais pré-configurados |

| Etapa | Horas |
|---|---|
| Descoberta + Arquitetura | 16h |
| relational-generator.ts (com N:N) | 20h |
| Editor visual de relacionamentos | 24h |
| UI multi-passos | 16h |
| Output multi-entidade | 12h |
| Exportação (todos os formatos) | 20h |
| Presets relacionais | 8h |
| Seed determinística | 6h |
| Integração | 12h |
| i18n | 6h |
| CSS | 8h |
| Testes unitários | 12h |
| Testes integração | 10h |
| QA e correções | 12h |
| **Total** | **182h (~23 dias úteis)** |

| Meta-dado | Valor |
|---|---|
| Complexidade | Alta |
| Confiança | Média-Baixa |
| Risco principal | Editor visual + N:N + volume |

---

## 12. Roadmap Recomendado

### Fase 0 — Preparação Técnica (2-3 dias)

**Objetivo:** Decisões de modelo e infraestrutura.

**Entregáveis:**
- Definir interfaces `EntityRelation`, `RelationalEntity`, `RelationalConfig`
- Decidir naming de FK (convenção + override manual)
- Adicionar `primaryKey` opcional nos presets
- Criar scaffold de `relational-generator.ts`
- Decidir dependência JSZip (Fase 2) — adiar instalação

**Critérios de aceite:**
- Interfaces TypeScript definidas e tipadas
- Presets com `primaryKey` (default `'id'`)
- Teste unitário que valida ordenação topológica de 2 entidades

**Riscos:** Decisões de modelo podem mudar durante implementação.

### Fase 1 — MVP de Duas Tabelas (5-7 dias)

**Objetivo:** Gerar Pessoa → Pedido com FK coerente e exportar SQL.

**Entregáveis:**
- `relational-generator.ts` completo
- `RelationalConfig.tsx` (UI de configuração)
- Modo toggle no `DataGenerator.tsx`
- Exportação SQL multi-tabela
- Validação de integridade pós-geração
- 10+ testes unitários

**Critérios de aceite:**
- Gera 100 Pessoas + 500 Pedidos com zero FKs órfãs
- SQL exportado é válido e pode ser importado em SQLite/PostgreSQL
- UI permite configurar 2 templates e 1 relacionamento
- Validação impede geração com configuração inválida

**Riscos:** Decisões de UI durante implementação podem causar retrabalho.

### Fase 2 — Múltiplos Templates e Grafo (5-8 dias)

**Objetivo:** Suportar 3+ entidades com cadeia de dependências.

**Entregáveis:**
- Grafo de dependências com ordenação topológica
- Detecção de ciclos
- XLSX multi-aba
- ZIP com 1 arquivo por tabela
- Seed determinística (mulberry32)
- Inferência automática de FK com confirmação

**Critérios de aceite:**
- Gera Categorias → Produtos → Pedidos (3 níveis)
- XLSX exportado tem 3 abas com dados coerentes
- ZIP contém 3 arquivos CSV
- Mesma seed produce mesmos dados

**Riscos:** Complexidade do grafo cresce rapidamente com 3+ entidades.

### Fase 3 — UX e Formatos Extras (5-8 dias)

**Objetivo:** Melhorar UX, adicionar presets e formatos.

**Entregáveis:**
- Presets de conjuntos relacionais (Pessoas→Pedidos, Categorias→Produtos→Pedidos)
- Exportação nos 6 formatos existentes (adaptados para multi-tabela)
- Melhorias de UX (drag-and-drop de entidades, preview de dados)
- Relações 1:1

**Critérios de aceite:**
- Preset "E-commerce Completo" gera 4 tabelas coerentes em 1 clique
- Exportação em qualquer formato preserva relacionamentos

### Fase 4 — Escala e Maturidade (futuro)

**Objetivo:** Editor visual, N:N, grandes volumes.

**Entregáveis:**
- Editor visual de relacionamentos (nós e arestas)
- Relações N:N via tabela pivô automática
- Otimização de performance para 50.000+ registros
- Observabilidade (métricas de uso relacional)

---

## 13. Arquivos e Áreas Potencialmente Impactados

### 13.1 Arquivos Novos

| Arquivo | Linhas Est. | Dependências |
|---|---|---|
| `src/engine/relational-generator.ts` | ~150 | generator.ts, presets.ts |
| `src/components/RelationalConfig.tsx` | ~250 | presets.ts, useLocale |
| `src/components/RelationalOutput.tsx` | ~200 | OutputPreview, exporters |
| `src/utils/relational-exporters.ts` | ~120 | exporters.ts, xlsx |

### 13.2 Arquivos Modificados

| Arquivo | Mudanças | Risco |
|---|---|---|
| `src/components/DataGenerator.tsx` | +40-60 linhas (modo toggle, state relacional) | Médio |
| `src/templates/presets.ts` | +1-2 propriedades por preset | Baixo |
| `src/utils/exporters.ts` | toXLSX multi-aba (~10 linhas) | Baixo |
| `src/index.css` | +80-120 linhas (estilos relativos) | Baixo |
| `src/i18n/pt-BR.ts` | +20-30 labels | Baixo |
| `src/i18n/en-US.ts` | +20-30 labels | Baixo |
| `src/i18n/en-GB.ts` | +20-30 labels | Baixo |
| `src/i18n/fr-FR.ts` | +20-30 labels | Baixo |
| `src/i18n/en-IE.ts` | +20-30 labels | Baixo |
| `src/i18n/world.ts` | +20-30 labels | Baixo |

### 13.3 Arquivos NÃO Impactados

| Arquivo | Razão |
|---|---|
| `src/engine/generator.ts` | Motor intacto — orquestração é externa |
| `src/engine/generator.worker.ts` | Worker reutilizável |
| `src/engine/correlations/*` (19 arquivos) | Correlações intactas |
| `src/dictionaries/*` (todos) | Dicionários intactos |
| `src/components/FieldSelector.tsx` | Sem mudanças |
| `src/components/SortableFields.tsx` | Sem mudanças |
| `src/components/TemplateSelector.tsx` | Sem mudanças |
| `src/components/CustomFieldsEditor.tsx` | Sem mudanças |
| `src/hooks/useLocale.tsx` | Sem mudanças |
| `src/utils/useTheme.ts` | Sem mudanças |

---

## 14. Perguntas em Aberto e Decisões Necessárias

| # | Pergunta | Impacto | Recomendação |
|---|---|---|---|
| 1 | O toggle "Simples/Relacional" deve ser no DataGenerator ou uma rota/page separada? | UI | **Toggle no DataGenerator** — mantém a app como SPA, sem react-router |
| 2 | Cada entidade deve ter locale independente? | Dados | **Não no MVP** — locale global. Fase 2 pode permitir |
| 3 | Deve existir limite de entidades? | UX | **5 entidades máximo** — evitar UI complexa |
| 4 | O output deve mostrar todas as entidades ao mesmo tempo ou em abas? | UX | **Abas** — 1 aba por entidade + aba "SQL" com tudo |
| 5 | Exportação SQL deve incluir DROP TABLE IF EXISTS? | UX | **Sim, opcional** — checkbox "Incluir DROP" |
| 6 | Deve-se adicionar `jszip` como dependência? | Bundle | **Sim, na Fase 2** — MVP usa SQL apenas |
| 7 | O modo relacional deve funcionar com o "World" locale? | Dados | **Sim** — cada entidade usa o locale global |
| 8 | Campos customizados devem ser suportados nas entidades relativas? | MVP | **Sim** — reutilizar CustomFieldsEditor existente |
| 9 | A exportação deve incluir diagrama/ERD? | Futuro | **Não** — fora de escopo |
| 10 | Deve-se persistir a configuração relacional no localStorage? | UX | **Sim** — facilita testes repetidos |

---

## 15. Recomendação Final

### Decisão: **Proceder com o Cenário B (Versão Recomendada)**

**Justificativa:**

1. **O Cenário A é muito enxuto** — não entrega XLSX multi-aba nem ZIP, que são os formatos mais pedidos por devs e analistas. O esforço adicional para chegar ao Cenário B é ~50% a mais, mas o valor entregue é 3× maior.

2. **O Cenário C é excessivo para MVP** — editor visual de relacionamentos, N:N, e todos os formatos de exportação são features de produto maduro, não de uma primeira versão.

3. **O Cenário B equilibra valor, risco e esforço** — 11 dias úteis para entregar um recurso que resolve o problema real (gerar dados relacionais coerentes) com formatos de exportação que os usuários realmente usam (SQL, XLSX, ZIP).

4. **A arquitetura é segura** — o motor de geração (`FakeDataGenerator`) não precisa de mudanças. Toda a lógica relacional fica em uma camada de orquestração externa, o que minimize risco de regressão.

5. **O projeto tem base sólida** — correlações sofisticadas, worker para performance, dicionários ricos, e uma UI funcional. O recurso relativo é uma evolução natural, não uma revolução.

**Próximo passo imediato:** Criar `src/engine/relational-generator.ts` com as interfaces TypeScript e a função `topologicalSort()` — isso é a base sobre a qual todo o resto será construído.
