# Reddit — Posts Otimizadas (por subreddit)

---

## 1. r/SideProject (MAIOR IMPACTO — comece por aqui)

**Regras:** Self-promo permitida se mostrar o produto, pedir feedback, e ter contexto. Conta com 200K+ membros.

**Melhor horário:** Terça 14h EST ou Sábado 10h EST

**Flair:** Use "Show & Tell" ou "Feedback Request"

**Title:**
```
I built a free fake data generator with 120+ fields and a correlation engine — looking for feedback
```

**Body:**
```
I've been working on Fake Database (https://fakedatabase.com/) — a free, browser-based tool for generating realistic fake data.

**The problem:** I needed test data for a project and every tool was either $49/month (Mockaroo) or required a backend server (Faker.js). I wanted something free, browser-based, and with data that actually makes sense together.

**What it does:**
- 120+ data fields across 19 categories
- 15 quick templates (Person, Company, E-commerce, SaaS User, etc.)
- 7 export formats: CSV, Excel, JSON, SQL, XML, YAML
- Cross-field correlations — gender determines name, age determines salary, car brand determines model
- Custom columns with SQL types (INT, VARCHAR, DATE, UUID...)
- Null and error injection for edge-case testing
- US + Brazilian data (CPF/CNPJ, SSN/EIN)
- 100% client-side — no server, no signup

**Tech:** React 18, TypeScript, Vite, @dnd-kit, SheetJS

**What I'd love feedback on:**
1. What data fields or templates would you add?
2. Is the UI intuitive or confusing?
3. Any export formats missing?

It's live at https://fakedatabase.com/ — would really appreciate your honest feedback.
```

---

## 2. r/InternetIsBeautiful

**Regras:** Deve ser um serviço único e interessante. Sem agregadores, sem login obrigatório.

**Melhor horário:** Qualquer dia, manhã EST

**Title:**
```
https://fakedatabase.com — Generate realistic fake data with correlations between fields (free, no signup)
```

**Body:**
```
Generates fake data that's internally consistent — gender determines name, car brand determines model, age determines salary. Exports to CSV, Excel, JSON, SQL, XML, YAML. Everything runs in your browser, no data sent to servers.
```

> **Nota:** r/InternetIsBeautiful prefere posts curtos. O link no título já é suficiente. O corpo é opcional e deve ser mínimo.

---

## 3. r/programming

**Regras:** Conteúdo técnico. Posts "How I built X" funcionam se focarem em arquitetura.

**Melhor horário:** Terça ou Quarta, 9h-12h EST

**Title:**
```
How I built a cross-field correlation engine for fake data generation in TypeScript
```

**Body:**
```
I want to share the architecture behind Fake Database (https://fakedatabase.com/), a browser-based fake data generator.

**The problem:** Most generators create each field independently. I needed data that's internally consistent — if someone is 65, their salary should reflect seniority, their education should be a graduate degree.

**The correlation engine:**

Each field generator receives context from previously generated fields:

```typescript
function generateSalary(context: { seniority: string; education: string }): number {
  const base = SENORITY_SALARY_MAP[context.seniority];
  const bonus = EDUCATION_BONUS[context.education];
  return randomInt(base.min + bonus, base.max + bonus);
}
```

40+ correlations cascade through the generation:
- Age → seniority → salary range → education level
- Gender → first name, title (Mr./Mrs./Dr.)
- Car brand → model → fuel type → vehicle type
- Disease → medication
- Country → currency → nationality → timezone
- Height × weight → BMI-correlated (18.5-30)

**Semantic inference for custom columns:**

When users add custom columns, a 130+ entry semantic map matches column names to generators:

```typescript
const SEMANTIC_MAP: Record<string, GeneratorKey> = {
  'email': 'email',
  'endereco': 'fullAddress',
  'nome': 'fullName',
  // ...
};
```

A column called "customer_email" automatically maps to the email generator.

**Performance:**

Generating 5,000 records runs in a Web Worker to keep the UI responsive, with progress reporting every 100 records.

**Stack:** React 18, TypeScript, Vite, @dnd-kit, SheetJS

Source: https://github.com/BrunoZBonetto/fake-data-generator
Live: https://fakedatabase.com/
```

---

## 4. r/reactjs

**Regras:** Foco em React. Componentes, hooks, patterns, performance.

**Melhor horário:** Terça ou Quarta, 9h-12h EST

**Title:**
```
Built a fake data generator with React — Web Worker for 5K records, @dnd-kit for drag-and-drop, Context for i18n
```

**Body:**
```
I built Fake Database (https://fakedatabase.com/) using React 18, TypeScript, and Vite. A few React-specific decisions that might be useful:

**Web Worker for large datasets:**

Generating 1,000+ records with 20+ fields blocks the main thread. Moved generation to a Worker:

```typescript
// generator.worker.ts
self.onmessage = (e: MessageEvent<WorkerRequest>) => {
  const { fields, count, options } = e.data;
  const results: Record<string, unknown>[] = [];
  for (let i = 0; i < count; i++) {
    results.push(generateRecord(fields, options));
    if (i % 100 === 0) {
      self.postMessage({ type: 'progress', current: i, total: count });
    }
  }
  self.postMessage({ type: 'complete', data: results });
};
```

**@dnd-kit for field reordering:**

Drag-and-drop for 120+ fields. @dnd-kit is the best React DnD library I've used — clean API, accessible, performant.

**Context for locale and theme:**

```typescript
const LocaleContext = createContext<LocaleContextType>({} as LocaleContextType);
// Provides PT-BR / EN-US switching with locale-aware data generation
```

**Manual chunk splitting:**

```typescript
// vite.config.ts
manualChunks: {
  xlsx: ['xlsx'],           // 282 KB
  vendor: ['react', 'react-dom'],
  dnd: ['@dnd-kit/core', '@dnd-kit/sortable'],
}
```

**Component architecture:**

```
DataGenerator (orchestrator)
├── FieldSelector (categorized picker, search)
├── SortableFields (drag-and-drop reordering)
├── TemplateSelector (15 presets)
├── CustomFieldsEditor (SQL-like column types)
└── OutputPreview (7 formats, pagination)
```

Live: https://fakedatabase.com/
Source: https://github.com/BrunoZBonetto/fake-data-generator
```

---

## 5. r/webdev (CUIDADO — regras strict)

**Regras:** Self-promo MUITO restrita. Só em "Showoff Saturday" com foco técnico. Posts promocionais são removidos.

**Melhor horário:** Sábado (Showoff Saturday), manhã EST

**Title (Showoff Saturday):**
```
[Showoff Saturday] Fake Database — free fake data generator with 120+ fields, correlation engine, 7 export formats
```

**Body:**
```
Built Fake Database (https://fakedatabase.com/) — a free, browser-based fake data generator.

**Technical highlights:**
- Cross-field correlation engine (40+ relationships) — data is internally consistent
- Semantic map (130+ entries) for automatic column type inference
- Web Worker for generating 5,000 records without blocking UI
- @dnd-kit for drag-and-drop field reordering
- SheetJS for Excel export
- PWA with service worker for offline support
- Manual chunk splitting (xlsx, react, dnd-kit)
- Dual locale support (PT-BR / EN-US) with locale-aware data generation

**Why I built it:** Mockaroo charges $49/month for SQL/Excel export. Faker.js requires a backend. I wanted something free, browser-based, and with correlated data.

Stack: React 18, TypeScript, Vite

Feedback welcome — what fields or features would you add?
```

---

## 6. BÔNUS — r/QualityAssurance

**Regras:** Comunidade de QA. Posts sobre ferramentas de teste são bem-vindos.

**Melhor horário:** Dia útil, manhã EST

**Title:**
```
Free tool for generating realistic test data — 120+ fields, SQL/CSV/Excel export, null & error injection
```

**Body:**
```
Hey QA folks,

I built Fake Database (https://fakedatabase.com/) — a free tool for generating realistic fake data for testing.

**Why it's useful for QA:**
- 120+ data fields (names, addresses, financial, health, vehicles...)
- Null injection (0-50%) — test how your app handles missing data
- Error injection (0-50%) — corrupt values with special characters to test edge cases
- Cross-field correlations — data is internally consistent
- 7 export formats including SQL (CREATE TABLE + INSERT)
- Custom columns with SQL types
- Up to 5,000 records per generation

**Perfect for:**
- Populating test databases
- Testing form validation
- Stress-testing APIs with realistic payloads
- Creating demo data for stakeholders

Free, no signup, runs in your browser.
```

---

## Resumo — Ordem de publicação

| Ordem | Subreddit | Melhor dia | Impacto esperado |
|---|---|---|---|
| 1 | r/SideProject | Terça 14h EST | 🔥🔥🔥 Alto |
| 2 | r/InternetIsBeautiful | Qualquer dia | 🔥🔥 Médio |
| 3 | r/programming | Terça 9h EST | 🔥🔥 Médio |
| 4 | r/reactjs | Quarta 9h EST | 🔥🔥 Médio |
| 5 | r/webdev | Sábado (Showoff Saturday) | 🔥🔥🔥 Alto |
| 6 | r/QualityAssurance | Dia útil manhã | 🔥 Médio |

**Regra de ouro:** Não post tudo no mesmo dia. Espalhe por 1-2 semanas. Reddit penaliza crossposting múltiplo no mesmo dia.

---

## Regras gerais do Reddit

1. **NÃO peça upvotes** — diga "check it out", nunca "please upvote"
2. **Responda TODOS os comentários** — engajamento é sinal de qualidade
3. **Cumpra o 9:1 rule** — para cada 1 post seu, tenha 9 interações que não são sobre seu produto
4. **Não post a mesma coisa em múltiplos subs no mesmo dia** — espalhe por dias diferentes
5. **Seja honesto** — se alguém criticar, agradeça e responda com substância
