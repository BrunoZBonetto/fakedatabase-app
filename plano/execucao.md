# Plano de Execução — Melhorias do Fake Data Generator

## Estrutura do Projeto (ref.)
```
src/
├── components/
│   ├── DataGenerator.jsx        # Container principal (orquestrador)
│   ├── FieldSelector.jsx        # Seletor de campos por categoria
│   ├── CustomFieldsEditor.jsx   # Colunas personalizadas
│   ├── OutputPreview.jsx        # Visualização e exportação
│   ├── TemplateSelector.jsx     # Templates prontos
│   └── GenerationHistory.jsx    # Histórico (localStorage)
├── engine/
│   └── generator.js             # Motor de geração de dados
├── dictionaries/                # Dicionários JSON brasileiros
│   ├── names.json
│   ├── address.json
│   ├── company.json
│   ├── internet.json
│   ├── finance.json
│   ├── profession.json
│   └── categories.json
├── templates/
│   └── presets.js               # Templates pré-definidos
├── utils/
│   ├── random.js                # Utilitários de aleatoriedade
│   └── exporters.js             # Exportadores (SQL, XML, XLSX)
├── App.jsx
├── App.css                      # ← MORTO (remover)
├── index.css
└── main.jsx
```

---

## 🔴 Lote 1 — Alta Prioridade

### 1.1 — Migrar para TypeScript

**Motivação**: TypeScript traz segurança de tipos para o generator (100+ campos), dicionários JSON e componentes React. O projeto já inclui `@types/react` e `@types/react-dom`.

**Arquivos afetados**: Todos os `.jsx`/`.js` → `.tsx`/`.ts`

**Passos**:
1. Instalar dependências TypeScript:
   - `typescript`
   - `@typescript-eslint/eslint-plugin`
   - `@typescript-eslint/parser`
   - `typescript-eslint`
2. Criar `tsconfig.json` com configuração para React + Vite:
   - `jsx: "react-jsx"`
   - `moduleResolution: "bundler"`
   - `strict: true`
   - `include: ["src"]`
3. Renomear arquivos:
   - `src/main.jsx` → `src/main.tsx`
   - `src/App.jsx` → `src/App.tsx`
   - `src/components/*.jsx` → `src/components/*.tsx`
   - `src/engine/generator.js` → `src/engine/generator.ts`
   - `src/utils/*.js` → `src/utils/*.ts`
   - `src/templates/presets.js` → `src/templates/presets.ts`
4. Tipar os dicionários JSON (criar `src/types/dictionaries.ts`)
5. Atualizar `vite.config.js` para `vite.config.ts` (opcional)
6. Garantir que `npm run build` compila sem erros

---

### 1.2 — Substituir `window.__fdgSaveHistory` por prop callback

**Motivação**: Comunicação via `window.__fdgSaveHistory` quebra o fluxo unidirecional do React e é frágil.

**Arquivos afetados**:
- `src/components/DataGenerator.jsx` (remoção do uso do window + adicionar saveToHistory)
- `src/components/GenerationHistory.jsx` (remoção do window + aceitar prop callback)
- `src/components/DataGenerator.jsx` (passar saveToHistory como prop)

**Passos**:
1. Em `GenerationHistory`:
   - Aceitar prop `onSave: (fields: string[], count: number) => void`
   - Remover `useEffect` com `window.__fdgSaveHistory`
   - Manter `saveToHistory` como função interna, chamando `onSave` se fornecida
2. Em `DataGenerator`:
   - Criar função `handleSaveToHistory` no escopo do componente
   - Passá-la como `<GenerationHistory onSave={handleSaveToHistory}>`
   - Remover uso de `window.__fdgSaveHistory`
3. Verificar que o histórico continua funcionando

---

### 1.3 — Remover `App.css` (código morto)

**Motivação**: `App.css` contém estilos do template Vite que não são usados.

**Arquivos afetados**:
- `src/App.css` (deletar)
- `src/App.jsx` (remover import)

**Passos**:
1. Deletar `src/App.css`
2. Remover linha `import './App.css'` de `src/App.jsx`
3. Verificar que não há quebra de layout

---

### 1.4 — Remover scripts `setup-etapa2.cjs` e `setup-etapa3.cjs`

**Motivação**: Scripts de scaffolding que recriam o projeto do zero. Desnecessários no código final.

**Arquivos afetados**:
- `setup-etapa2.cjs` (deletar)
- `setup-etapa3.cjs` (deletar)

**Passos**:
1. Deletar `setup-etapa2.cjs`
2. Deletar `setup-etapa3.cjs`

---

### 1.5 — Adicionar Web Worker para geração pesada

**Motivação**: Para 5000 registros, o `setTimeout(10ms)` não evita congelamento. Um Worker executa em thread separada.

**Arquivos afetados**:
- Criar `src/engine/generator.worker.js`
- `src/components/DataGenerator.jsx`

**Passos**:
1. Criar `src/engine/generator.worker.js`:
   - Importar `FakeDataGenerator`
   - Escutar `onmessage` com `{ fields, count, customFields }`
   - Gerar dados e postar `postMessage` com resultado
2. Em `DataGenerator`:
   - Criar Worker quando `handleGenerate` for chamado
   - Mostrar loading/barra de progresso
   - Receber resultado via `onmessage` e chamar `setData`
   - Encerrar worker com `terminate()`
3. Para quantidades pequenas (< 1000), manter geração síncrona (evitar overhead)

**Verificação**: Gerar 5000 registros sem congelamento visível.

---

### 1.6 — Adicionar script de lint ao package.json

**Motivação**: ESLint está configurado mas não há script para executá-lo.

**Arquivos afetados**:
- `package.json` (adicionar script)

**Passos**:
1. Adicionar `"lint": "eslint src/"` aos scripts
2. Adicionar `"lint:fix": "eslint src/ --fix"`

---

## 🟡 Lote 2 — Média Prioridade

### 2.1 — Virtualização da tabela

**Motivação**: 5000 registros renderizam 5000+ linhas no DOM, causando lentidão.

**Dependência**: `react-window`

**Arquivos afetados**:
- `src/components/OutputPreview.tsx` (substituir table por FixedSizeList)

**Passos**:
1. Instalar `react-window` e `@types/react-window`
2. Substituir a renderização da tabela no formato `table`:
   - Usar `FixedSizeList` com altura fixa (ex: 500px) e `itemSize` (ex: 36px)
   - Renderizar apenas `<div>` com `display: table-row` em vez de `<tr>`
   - Manter `<thead>` fixo fora do virtualized list
3. Remover paginação manual (virtualização já resolve)

---

### 2.2 — Seed para geração reproduzível

**Motivação**: Sem seed, cada geração é diferente. Impossível reproduzir um conjunto específico para testes.

**Arquivos afetados**:
- `src/utils/random.js` (adicionar PRNG com seed)
- `src/engine/generator.js` (aceitar seed opcional)
- `src/components/DataGenerator.jsx` (campo de seed na UI)

**Passos**:
1. Implementar PRNG (e.g., mulberry32 ou xoshiro128) em `random.js`:
   - Função `createRng(seed)` que retorna função `() => number` no lugar de `Math.random`
2. Modificar `randomInt`, `randomPick`, `randomBool`, `randomDate` para aceitar RNG opcional
3. Em `FakeDataGenerator`:
   - Construtor aceitar `seed?: number`
   - Se seed fornecida, criar RNG própria e usar em vez de `Math.random`
4. UI: adicionar campo "Semente" opcional nos controles

---

### 2.3 — Garantir correlação cidade/estado

**Motivação**: Cidade "São Paulo" pode vir com estado "RJ". Dados perdem realismo.

**Arquivos afetados**:
- `src/dictionaries/address.json` (manter estrutura já adequada)
- `src/engine/generator.js` (corrigir geradores `city` e `state`)

**Passos**:
1. Modificar gerador `city`: retornar objeto `{ name, state }`
2. Modificar gerador `state`: buscar estado da cidade atual (ou usar último `city` gerado)
3. Modificar `fullAddress` para usar cidade + estado consistentes
4. Considerar: armazenar último `cityData` no `this` do generator para referência cruzada
5. Estender para: CPF consistente com estado de emissão (opcional)

---

### 2.4 — Sistema de notificações (toast)

**Motivação**: `alert()` é bloqueante. Notificações não-bloqueantes melhoram UX.

**Arquivos afetados**:
- Criar `src/components/Toast.jsx`
- `src/components/DataGenerator.jsx` (substituir alerts)

**Passos**:
1. Criar componente `Toast`:
   - Estados: `success`, `error`, `info`, `warning`
   - Auto-dismiss em 3s
   - Posicionamento: canto superior direito
   - Animações CSS
2. Criar hooks/função `useToast` ou contexto para disparar notificações
3. Substituir todos os `alert()` por `toast.error()` ou `toast.success()`

---

### 2.5 — Barra de progresso para gerações grandes

**Motivação**: Sem feedback durante geração de 5000 registros.

**Arquivos afetados**:
- `src/components/DataGenerator.jsx` (progresso + Web Worker)
- `src/engine/generator.worker.js` (postar progresso)

**Passos**:
1. No Worker, postar mensagens de progresso a cada N registros:
   - `postMessage({ type: 'progress', current, total })`
2. No componente, ouvir `onmessage` e atualizar barra de progresso
3. Quando completo, trocar barra por resultado
4. Para geração síncrona (< 1000), não mostrar barra (instantâneo)

---

### 2.6 — Adicionar testes (Vitest)

**Motivação**: Projeto sem testes. Engine de geração tem 100+ campos que podem quebrar.

**Dependência**: `vitest`, `@testing-library/react`

**Arquivos afetados**:
- Criar `src/engine/generator.test.js`
- Criar `src/utils/random.test.js`
- Criar `src/components/DataGenerator.test.jsx`
- `package.json` (adicionar script de teste)

**Passos**:
1. Instalar `vitest`, `@testing-library/react`, `jsdom`
2. Configurar `vite.config.js` com `test: { environment: 'jsdom' }`
3. Criar testes para `random.js`:
   - `randomInt` retorna inteiros no intervalo correto
   - `generateCPF` gera CPF com dígitos verificadores válidos
   - `generateCNPJ` gera CNPJ com dígitos verificadores válidos
4. Criar testes para `generator.js`:
   - `generate` retorna array do tamanho correto
   - `generateField` retorna valor para todos os campos conhecidos
   - `generateCustomField` com inferência semântica funciona
   - `castToType` converte corretamente
   - Duplicidade de campos personalizados é detectada
5. Adicionar script `"test": "vitest run"` e `"test:watch": "vitest"`

---

## 🟢 Lote 3 — Baixa Prioridade

### 3.1 — Campo de busca/filtro nos campos

**Motivação**: Com 50+ campos organizados em 10 categorias, achar um campo específico exige abrir categoria por categoria.

**Arquivos afetados**:
- `src/components/FieldSelector.tsx`

**Passos**:
1. Adicionar `<input type="search">` no topo do seletor
2. Filtrar campos que correspondem ao termo (match no label)
3. Quando filtro ativo, expandir todas as categorias com match
4. Destacar visualmente o termo buscado nos nomes

---

### 3.2 — Reordenação de colunas (drag & drop)

**Motivação**: A ordem dos campos no output segue a ordem de seleção. Poder arrastar para reordenar.

**Dependência**: `@dnd-kit/core`

**Arquivos afetados**:
- `src/components/FieldSelector.tsx` (seção de campos selecionados)

**Passos**:
1. Exibir lista de campos selecionados acima/dentro do seletor
2. Usar `@dnd-kit` para drag & drop na lista
3. Ao soltar, atualizar ordem no estado `selectedFields`
4. Opção: mostrar preview da ordem final

---

### 3.3 — Exportar/Importar templates personalizados

**Motivação**: Templates pré-definidos são fixos. Usuário não pode salvar suas combinações.

**Arquivos afetados**:
- `src/components/DataGenerator.tsx` (estado de templates customizados)
- `src/components/TemplateSelector.tsx` (seção de templates salvos)

**Passos**:
1. Adicionar botão "Salvar como template" nos controles
2. Salvar no `localStorage` com chave `fdg_custom_templates`
3. Exibir templates salvos no `TemplateSelector` separados dos pré-definidos
4. Permitir deletar templates salvos
5. Opção: exportar/importar como JSON

---

### 3.4 — Geração com valores nulos e injeção de erros

**Motivação**: Testar tratamento de nulos e dados inconsistentes é útil para QA.

**Arquivos afetados**:
- `src/components/DataGenerator.tsx` (controles de null/error)
- `src/engine/generator.ts` (lógica de injeção)

**Passos**:
1. Adicionar slider "% de nulos" e "% de erros" nos controles
2. Na geração, para cada campo, sortear se deve ser nulo/erro
3. Para erros:
   - CPF: inverter um dígito
   - Email: remover @
   - Telefone: adicionar letras
   - Data: valor inválido
4. Nulo: retornar `null` em vez do valor gerado

---

### 3.5 — Suporte a exportação YAML

**Motivação**: Formato útil para config files.

**Arquivos afetados**:
- `src/utils/exporters.js` (função `toYAML`)
- `src/components/OutputPreview.jsx` (botão YAML)

**Passos**:
1. Implementar `toYAML(data)` sem dependências (serialização manual simples)
2. Adicionar formato YAML no seletor de formatos
3. Adicionar MIME type `text/yaml`

---

### 3.6 — Tema claro (light mode)

**Motivação**: Acessibilidade e preferência do usuário.

**Arquivos afetados**:
- `src/index.css` (variáveis CSS para ambos os temas)
- Criar hook `useTheme` (detectar `prefers-color-scheme`)
- `src/components/DataGenerator.tsx` (toggle de tema)

**Passos**:
1. Criar variáveis CSS para tema claro (override no `[data-theme="light"]`)
2. Hook `useTheme` que detecta `matchMedia('(prefers-color-scheme: light)')`
3. Botão de toggle sol/lua no header
4. Persistir preferência no `localStorage`

---

### 3.7 — Melhorias de acessibilidade

**Motivação**: Leitores de tela, navegação por teclado.

**Arquivos afetados**:
- Todos os componentes

**Passos**:
1. Adicionar `aria-label` em botões sem texto visível (✕, setas)
2. Adicionar `role="region"` e `aria-labelledby` nas seções
3. Garantir contraste mínimo 4.5:1 (verificar cores atuais)
4. Adicionar `aria-live="polite"` na região de output para anunciar nova geração
5. Foco gerenciado após ações (gerar, copiar)

---

### 3.8 — PWA (offline support)

**Motivação**: Usar o gerador sem internet.

**Arquivos afetados**:
- `index.html` (manifest link, service worker registration)
- Criar `public/manifest.json`
- `vite.config.js` (plugin PWA)

**Dependência**: `vite-plugin-pwa`

**Passos**:
1. Instalar `vite-plugin-pwa`
2. Configurar no `vite.config.js` com:
   - `registerType: 'autoUpdate'`
   - `manifest` com nome, ícones, tema
3. Criar `public/icons/` com ícones 192x192 e 512x512
4. Testar offline no devtools

---

## Resumo da Ordem de Execução

```
FASE 1 (🔥 Crítico)
├── 1.1  TypeScript ──────────────────── 2-3 dias
├── 1.2  Prop callback GenerationHistory   horas
├── 1.3  Remover App.css                  minutos
├── 1.4  Remover scripts setup             minutos
├── 1.5  Web Worker ──────────────────── 1 dia
└── 1.6  Script lint                      minutos

FASE 2 (⚡ Importante)
├── 2.1  Virtualização tabela ────────── 1-2 dias
├── 2.2  Seed reproduzível ────────────── 1 dia
├── 2.3  Correlação cidade/estado ─────── horas
├── 2.4  Toast notifications ───────────── 1 dia
├── 2.5  Barra de progresso              horas
└── 2.6  Testes (Vitest) ─────────────── 1-2 dias

FASE 3 (✨ Melhorias)
├── 3.1  Busca de campos                  horas
├── 3.2  Drag & drop reordenação ─────── 1-2 dias
├── 3.3  Templates customizados ────────── 1 dia
├── 3.4  Null/error injection             1 dia
├── 3.5  Export YAML                      horas
├── 3.6  Tema claro ───────────────────── horas
├── 3.7  Acessibilidade                   horas
└── 3.8  PWA ─────────────────────────── 1 dia
```

> **Nota**: Cada item pode ser executado independentemente. Recomenda-se começar pela Fase 1 e ir subindo. Os tempos são estimativas para uma pessoa; ajuste conforme disponibilidade.
