# Dev.to Article

## Title

How I Built a Fake Data Generator with a Cross-Field Correlation Engine in React

## Tags

react, typescript, javascript, webdev

## Canonical URL

https://fakedatabase.com/

---

## Article Body

### The Problem

Every developer needs fake data at some point. Testing a new app? You need realistic names, addresses, emails. Building a dashboard? You need sales data, products, orders.

The options I found:

1. **Mockaroo** — Great tool, but charges $49/month for SQL export, Excel export, and custom columns
2. **Faker.js** — Free, but requires a backend server and doesn't export to SQL/Excel
3. **Random generators** — Create each field independently, no correlations between data

I wanted something that's:
- **Free** — no limits, no signup
- **Browser-based** — no backend needed
- **Smart** — data that's internally consistent
- **Exportable** — CSV, Excel, JSON, SQL, XML, YAML

So I built [Fake Database](https://fakedatabase.com/).

### The Correlation Engine

The most interesting technical challenge was building a **cross-field correlation engine**. Most fake data generators create each field independently. But real data has relationships — a 65-year-old person is more likely to be a senior manager than an intern.

Here's how I approached it:

```typescript
// Each field generator receives context from previously generated fields
function generateSalary(context: { seniority: string; education: string }): number {
  const base = SENORITY_SALARY_MAP[context.seniority];
  const educationBonus = EDUCATION_BONUS[context.education];
  return randomInt(base.min + educationBonus, base.max + educationBonus);
}
```

The correlation system handles 40+ relationships:

| Field A | Field B | Correlation |
|---|---|---|
| Gender | First Name | Masculine/feminine names |
| Age | Seniority | Older → higher seniority |
| Seniority | Salary | Higher seniority → higher salary |
| Education | Seniority | PhD → typically senior |
| Car Brand | Car Model | Toyota → Corolla, Camry... |
| Disease | Medication | Diabetes → Metformin... |
| Country | Currency | Brazil → BRL, US → USD |
| Height × Weight | BMI | Correlated within healthy range |

### The Semantic Map

When users add custom columns, the system needs to figure out what data to generate. I built a **semantic map** with 130+ entries:

```typescript
const SEMANTIC_MAP: Record<string, GeneratorKey> = {
  'email': 'email',
  'e-mail': 'email',
  'endereco': 'fullAddress',
  'address': 'fullAddress',
  'nome': 'fullName',
  'name': 'fullName',
  // ... 130+ entries
};
```

When a user creates a column called "customer_email", the system matches it to the `email` generator automatically.

### Performance with Web Workers

Generating 5,000 records with 20+ fields is CPU-intensive. I moved the generation to a **Web Worker** to keep the UI responsive:

```typescript
// generator.worker.ts
self.onmessage = (e: MessageEvent<WorkerRequest>) => {
  const { fields, count, options } = e.data;
  const results: Record<string, unknown>[] = [];

  for (let i = 0; i < count; i++) {
    results.push(generateRecord(fields, options));
    // Report progress every 100 records
    if (i % 100 === 0) {
      self.postMessage({ type: 'progress', current: i, total: count });
    }
  }

  self.postMessage({ type: 'complete', data: results });
};
```

### Locale-Aware Data

The tool supports both English (US) and Brazilian Portuguese. This isn't just UI translation — the actual data adapts:

- **Date formats**: MM/DD/YYYY (US) vs DD/MM/YYYY (Brazil)
- **Phone numbers**: +1 (XXX) XXX-XXXX vs (DDD) 9XXXX-XXXX
- **Tax IDs**: SSN/EIN vs CPF/CNPJ
- **License plates**: ABC-1234 (US) vs ABC1D23 (Mercosul)
- **Salary ranges**: USD vs BRL with appropriate scales
- **Cultural data**: US states vs Brazilian states, NFL vs football clubs

### Tech Stack

| Technology | Why |
|---|---|
| React 18 | Component architecture, hooks |
| TypeScript | Type safety across 120+ fields |
| Vite | Fast dev server and builds |
| @dnd-kit | Drag-and-drop field reordering |
| SheetJS | Excel export |
| vite-plugin-pwa | Offline support |

### Results

- 120+ data fields across 19 categories
- 15 quick templates
- 7 export formats
- Runs entirely in the browser
- 100% free, no signup
- Supports US and Brazilian data

Try it: [fakedatabase.com](https://fakedatabase.com/)

Source: [github.com/BrunoZBonetto/fake-data-generator](https://github.com/BrunoZBonetto/fake-data-generator)

---

## Publishing Checklist

1. Copy the article body above
2. Go to https://dev.to/new
3. Paste the content
4. Add tags: `react`, `typescript`, `javascript`, `webdev`
5. Set canonical URL to https://fakedatabase.com/
6. Add a cover image (create a simple banner with the tool name)
7. Publish
