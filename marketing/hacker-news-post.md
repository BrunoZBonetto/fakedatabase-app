# Hacker News — Show HN Post

## Title

Show HN: Fake Database – free fake data generator with 120+ fields and correlation engine

## URL

https://fakedatabase.com/

## Comment

I built this because I needed realistic test data and every tool I found either cost $49/mo (Mockaroo) or required a backend (Faker.js).

Fake Database runs entirely in the browser. Key features:

- 120+ data fields across 19 categories (names, addresses, financial, health, vehicles, entertainment, etc.)
- 15 quick templates (Person, Company, E-commerce, SaaS User, etc.)
- 7 export formats: CSV, Excel, JSON, SQL, XML, YAML, and table view
- Cross-field correlation engine — data is internally consistent (age → seniority → salary, gender → name, car brand → model, etc.)
- Custom columns with SQL-like types (INT, VARCHAR, DATE, UUID...)
- Null and error injection for edge-case testing
- Supports US and Brazilian data (CPF/CNPJ, SSN/EIN, locale-aware formatting)
- 100% client-side — no signup, no data sent to servers

Tech: React 18, TypeScript, Vite, @dnd-kit (drag-and-drop), SheetJS (Excel export), Web Worker for large datasets.

Source: https://github.com/BrunoZBonetto/fake-data-generator
