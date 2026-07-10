# Product Hunt — Guia Completo de Submissão

## Melhor dia/hora para lançar

- **Dia:** Terça, Quarta ou Quinta-feira (menos competição que Segunda)
- **Horário:** 00:01 AM horário do Pacífico (PST/PDT)
- **Horário no Brasil:** 04:01 AM (horário de Brasília)
- **Por que:** Janela de 24h completa de votação, pico de engajamento nos EUA

---

## Campo a campo — como preencher

### Product Name
```
Fake Database
```

### Tagline (máx. 60 caracteres)

**Opção 1 (recomendada):**
```
Free fake data generator — 120+ fields, 7 export formats
```
(57 caracteres)

**Opção 2:**
```
Generate realistic fake data for testing — 100% free
```
(53 caracteres)

**Opção 3:**
```
Fake data generator for devs — CSV, JSON, SQL, Excel
```
(53 caracteres)

> **Por que a Opção 1?** Ela tem os 3 ingredientes: o que faz (fake data generator), prova social numérica (120+ fields), e diferencial (7 export formats). Números chamam atenção no feed.

---

### URL
```
https://fakedatabase.com
```

### Description (máx. 260 caracteres para sinopse + descrição completa)

**Sinopse curta (aparece no card):**
```
Generate realistic fake data for testing and development. 120+ fields, 15 templates, CSV/Excel/JSON/SQL/XML/YAML export. Free, no signup, runs in your browser.
```

**Descrição completa (para a página do produto):**
```
Every developer needs realistic test data at some point. But the options are limited: Mockaroo charges $49/month for features like SQL export and Excel, Faker.js requires a backend, and random generators create isolated fields with no correlations between them.

Fake Database is a free, browser-based tool that solves this. It generates realistic fake data with 120+ fields across 19 categories, 15 pre-built templates, and 7 export formats.

What makes it different:

• Cross-field correlations — gender determines name, age determines salary, car brand determines model. Data is internally consistent, not random.

• 7 export formats — CSV, Excel (.xlsx), JSON, SQL (CREATE TABLE + INSERT), XML, YAML, and interactive table view. Most competitors charge $49/month for SQL + Excel.

• Custom columns — add unlimited fields with SQL-like types (INT, VARCHAR, DATE, UUID, etc.)

• Null & error injection — configurable rates for edge-case testing

• US + Brazilian data — locale-aware formatting for CPF/CNPJ, SSN/EIN, addresses, phones, dates

• 100% client-side — no server, no signup, no data sent anywhere

Built with React, TypeScript, and Vite. Open source.
```

---

### Topics / Categories (escolher 3)

1. **Developer Tools** (principal)
2. **Productivity** (secundário)
3. **Open Source** (terciário)

> **Por que essas?** Developer Tools é a categoria mais precisa. Productivity amplia o alcance. Open Source sinaliza credibilidade na comunidade PH.

---

### Makers

Adicione seu perfil: **Bruno Zanotti Bonetto**
- Foto real (não logo)
- Bio curta: "Developer. Building free tools for devs."

---

### Thumbnail (240×240px)

- Usar o ícone existente (`public/icons/icon.svg`) em fundo sólido roxo (#7c5cfc)
- Sem texto, sem detalhes complexos — precisa ser legível em tamanho pequeno

---

### Gallery Images (1270×760px, 5-8 imagens)

**Imagem 1 — Hero (a mais importante):**
Screenshot do site com destaque visual. Mostrar a interface principal com dados gerados visíveis.
- Texto overlay: "Generate realistic fake data in seconds"
- Fundo escuro (tema dark do site)

**Imagem 2 — Templates:**
Mostrar o seletor de templates com os 15 presets visíveis.
- Texto: "15 quick templates — Person, Company, E-commerce..."
- Screenshot do TemplateSelector

**Imagem 3 — Fields:**
Mostrar o seletor de campos com as 19 categorias.
- Texto: "120+ data fields across 19 categories"
- Screenshot do FieldSelector

**Imagem 4 — Export:**
Mostrar o OutputPreview com abas de formatos (SQL, JSON, CSV, etc.)
- Texto: "7 export formats — CSV, Excel, JSON, SQL, XML, YAML"
- Screenshot do OutputPreview

**Imagem 5 — Correlations:**
Diagrama ou screenshot mostrando como os campos se correlacionam.
- Texto: "Smart correlations — data that makes sense"
- Pode ser um diagrama simples: Gender → Name, Age → Salary, Car Brand → Model

**Imagem 6 — Custom Fields:**
Mostrar o CustomFieldsEditor com colunas personalizadas.
- Texto: "Custom columns with SQL types — INT, VARCHAR, DATE..."
- Screenshot do CustomFieldsEditor

**Imagem 7 — Dark/Light Theme:**
Lado a lado dos dois temas.
- Texto: "Dark & light theme — your choice"

**Imagem 8 — Privacy:**
Ícone de cadeado ou escudo.
- Texto: "100% client-side — no server, no signup, no tracking"

---

### Video (45-60 segundos, opcional mas recomendado)

Se quiser criar um vídeo:
1. **0-5s:** Mostrar a URL fakedatabase.com e a interface carregando
2. **5-15s:** Selecionar um template (ex: E-commerce) e mostrar os campos sendo preenchidos
3. **15-25s:** Clicar em "Generate Data" e mostrar os dados aparecendo
4. **25-35s:** Mostrar os formatos de export (SQL, Excel, JSON)
5. **35-45s:** Mostrar custom fields e correlation engine
6. **45-55s:** Mostrar dark/light theme toggle
7. **55-60s:** Tela final com "fakedatabase.com — Free, no signup"

> Gravar com Loom ou OBS. Sem áudio necessário (PH reproduce muted).

---

### First Comment / Maker Comment (CRÍTICO)

Publicar **imediatamente** quando o produto for ao ar. Escrito em tom pessoal, não de marketing:

```
Hey Product Hunt! 👋

I'm Bruno, a developer from Brazil. I built Fake Database because I was tired of two options for test data:

1. Mockaroo — great tool, but $49/month for SQL export, Excel, and custom columns
2. Faker.js — free, but requires a backend server and creates each field independently with no correlations

I wanted something that's free, runs entirely in the browser, and generates data that actually makes sense together.

So I built [Fake Database](https://fakedatabase.com/) — a free fake data generator with:

• 120+ data fields across 19 categories
• 15 quick templates (Person, Company, E-commerce, SaaS User, etc.)
• 7 export formats: CSV, Excel, JSON, SQL, XML, YAML, and table view
• Cross-field correlations — gender → name, age → salary, car brand → model
• Custom columns with SQL types (INT, VARCHAR, DATE, UUID...)
• Null and error injection for edge-case testing
• US + Brazilian data (CPF/CNPJ, SSN/EIN, locale-aware formatting)

Everything runs client-side. No server, no signup, no data sent anywhere.

Built with React 18, TypeScript, Vite, and @dnd-kit for drag-and-drop.

I'd love to hear: what data fields or features would you add next? What's the most annoying thing about generating test data for your projects?

Thanks for checking it out! 🙏
```

> **Por que funciona:** Começa com história pessoal (gatilho emocional), lista comparativa com concorrentes (posicionamento), features específicas (prova), e termina com pergunta concreta (engajamento).

---

## Pre-launch checklist (semanas antes)

### 4 semanas antes
- [ ] Criar conta no Product Hunt (com foto real e bio)
- [ ] Seguir 50-100 usuários ativos no PH
- [ ] Comentar em 10+ launches de outros (ser visível na comunidade)
- [ ] Reservar o slug da URL no PH

### 2 semanas antes
- [ ] Preparar todas as gallery images (1270×760px)
- [ ] Gravar vídeo demo (45-60s)
- [ ] Escrever maker comment
- [ ] Enviar DMs pessoais para 30-50 pessoas (amigos, devs, colegas)
- [ ] Criar post teaser no Twitter/X

### 1 semana antes
- [ ] Verificar se nenhum lançamento grande está no mesmo dia
- [ ] Agendar o post para 00:01 AM PT
- [ ] Confirmar que o site está rápido e funcionando

### Dia do lançamento
- [ ] 00:01 AM PT: Produto vai ao ar
- [ ] 00:02 AM PT: Publicar maker comment
- [ ] 00:05 AM PT: Enviar email/DM para lista de apoio
- [ ] 9 AM PT: Post no Twitter/X com link
- [ ] Responder **cada comentário** em até 15 minutos (9 AM - 9 PM PT)
- [ ] 3 PM PT: Post de update no Twitter ("We're #X on Product Hunt!")
- [ ] 11:59 PM PT: Post de agradecimento

---

## Regras importantes do PH

- **NÃO peça upvotes diretamente** — diga "check it out", não "please upvote"
- **NÃO compre upvotes** — PH detecta e penaliza
- **NÃO faça spam** em Slack/Discord com pedidos de voto
- **Responda TODOS os comentários** — velocidade de resposta é sinal de qualidade
- **Self-hunting é permitido** em 2026 — não precisa de um hunter

---

## O que esperar

| Resultado | Upvotes típicos | Traffic estimado |
|---|---|---|
| Top 10 | 300-600 | 2.000-8.000 visitantes |
| Top 5 | 500-1.000 | 5.000-15.000 visitantes |
| #1 do Dia | 800-1.500 | 10.000-30.000 visitantes |

> Para um produto gratuito sem audiência prévia, **Top 10 já é uma vitória**. O backlink no PH (DR 90+) vale muito para SEO.
