# Reddit Posts

## Post 1 — r/webdev

**Title:** I built a free fake data generator with 120+ fields, 15 templates, and 7 export formats

**Body:**

Hey r/webdev!

I've been working on a side project called **Fake Database** ([fakedatabase.com](https://fakedatabase.com/)) — a free, browser-based fake data generator.

**The problem:** I needed realistic test data for a project and every tool I found either wanted $49/month (Mockaroo) or required a backend server (Faker.js). I wanted something that runs entirely in the browser, is free, and generates data that actually makes sense.

**What it does:**
- 120+ data fields across 19 categories (names, addresses, financial, health, vehicles, etc.)
- 15 quick templates (Person, Company, E-commerce, SaaS User, etc.)
- 7 export formats: CSV, Excel, JSON, SQL, XML, YAML, and table view
- Cross-field correlations (gender → name, car brand → model, age → salary, etc.)
- Custom columns with SQL-like types (INT, VARCHAR, DATE, UUID...)
- Null and error injection for edge-case testing
- Supports US and Brazilian data (CPF/CNPJ, SSN/EIN, locale-aware formats)
- Dark/light theme, PWA support
- 100% free, no signup, no data sent to servers

**Tech stack:** React 18, TypeScript, Vite, @dnd-kit (drag-and-drop), SheetJS (Excel export)

**Why it's different from Mockaroo:** Mockaroo charges $49/month for features like SQL export, Excel export, and custom columns. Fake Database offers all of that for free.

Check it out: [fakedatabase.com](https://fakedatabase.com/)

Would love feedback on what fields or features to add next!

---

## Post 2 — r/SideProject

**Title:** Show: FakeDatabase.com — Free fake data generator that runs in your browser (no signup, no limits)

**Body:**

I built [Fake Database](https://fakedatabase.com/) — a free online tool for generating realistic fake data.

**What makes it useful:**
- 120+ data fields (names, addresses, financial, health, vehicles, entertainment...)
- 15 pre-built templates for common use cases
- Exports to CSV, Excel, JSON, SQL, XML, YAML
- Smart correlations so data is internally consistent
- Custom columns with SQL types
- Runs 100% in the browser — no server, no signup, no data collection

**Target audience:** Developers, QA engineers, data analysts, anyone who needs realistic test data.

It's a React + TypeScript + Vite app deployed on Netlify. Built it because I was tired of paying for Mockaroo or dealing with backend-dependent tools.

Live: [fakedatabase.com](https://fakedatabase.com/)

---

## Post 3 — r/InternetIsBeautiful

**Title:** fakedatabase.com — Generate realistic fake data with 120+ fields, correlations, and 7 export formats (free, no signup)

**Body:**

[fakedatabase.com](https://fakedatabase.com/) lets you generate realistic fake data right in your browser.

What's interesting:
- Data is correlated (gender determines name, car brand determines model, age determines salary range)
- Supports both US and Brazilian data with locale-aware formatting
- Exports to 7 formats including SQL, Excel, XML, YAML
- Custom columns with SQL-like types
- Everything runs client-side — no data leaves your browser

Great for testing, prototyping, demos, or learning SQL.

---

## Post 4 — r/programming

**Title:** How I built a fake data generator with a cross-field correlation engine in React

**Body:**

I want to share the architecture behind [Fake Database](https://fakedatabase.com/), a browser-based fake data generator.

**The interesting part: the correlation engine.**

Most fake data generators create each field independently. I wanted data that's internally consistent — if someone is 65 years old, their salary should reflect seniority, their education should be a graduate degree, and their hobbies should skew differently than a 25-year-old.

**How it works:**
- Each field generator receives context from previously generated fields
- A semantic map (130+ entries) matches custom column names to the correct generator
- Correlations cascade: age → seniority → salary range → education level
- The system handles 40+ cross-field correlations

**Example correlations:**
- Gender → first name, title (Mr./Mrs./Dr.)
- Car brand → model, fuel type, vehicle type
- Disease → medication
- Country → currency, nationality, timezone, language
- Height × weight → BMI-correlated (18.5-30)
- Quantity × price = amount (with optional discount)

**Tech choices:**
- React 18 + TypeScript for type safety across 120+ fields
- Web Worker for generating 1000+ records without blocking the UI
- @dnd-kit for drag-and-drop field reordering
- SheetJS for Excel export
- Vite for fast builds

Everything runs client-side — no backend, no data sent anywhere.

Live: [fakedatabase.com](https://fakedatabase.com/)
Source: [github.com/BrunoZBonetto/fake-data-generator](https://github.com/BrunoZBonetto/fake-data-generator)

---

## Post 5 — r/reactjs

**Title:** Built a fake data generator with React — 120+ fields, drag-and-drop, Web Worker for large datasets

**Body:**

I built [Fake Database](https://fakedatabase.com/) using React 18, TypeScript, and Vite.

**React-specific highlights:**
- **@dnd-kit** for drag-and-drop field reordering — works great, highly recommend
- **Web Worker** for generating 1000+ records without blocking the UI (with progress bar)
- **Context API** for locale (PT-BR/EN-US) and theme management
- **Custom hooks** for locale, theme, and analytics
- **Component architecture**: DataGenerator orchestrates FieldSelector, SortableFields, OutputPreview, TemplateSelector, CustomFieldsEditor

**Performance considerations:**
- Manual chunk splitting (xlsx, react, dnd-kit) for optimal loading
- Worker-based generation for large datasets
- PWA with service worker for offline support

Check it out: [fakedatabase.com](https://fakedatabase.com/)
