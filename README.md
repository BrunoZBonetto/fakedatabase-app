<p align="center">
  <img src="public/icons/icon.svg" alt="Fake Database Logo" width="120" />
</p>

<h1 align="center">Fake Database</h1>

<p align="center">
  <strong>Free online fake data generator for testing, prototyping, and demos</strong>
</p>

<p align="center">
  <a href="https://fakedatabase.com/">🌐 Live Demo</a> ·
  <a href="https://github.com/BrunoZBonetto/fake-data-generator/issues">🐛 Report Bug</a> ·
  <a href="https://github.com/BrunoZBonetto/fake-data-generator/issues">💡 Request Feature</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/License-MIT-green" alt="License" />
  <img src="https://img.shields.io/badge/Price-Free_&_Open_Source-brightgreen" alt="Price" />
</p>

---

## What is Fake Database?

**Fake Database** is a browser-based tool that generates realistic fake data for software testing, prototypes, and demos. No signup, no limits, no data sent to servers — everything runs locally in your browser.

**→ [Try it now at fakedatabase.com](https://fakedatabase.com/)**

---

## Why Fake Database?

| Feature | Fake Database | Mockaroo | Faker.js |
|---|---|---|---|
| **Price** | **Free** | $49/mo (pro) | Free |
| **No signup** | ✅ | ❌ | N/A |
| **Browser-based** | ✅ | ✅ | ❌ |
| **SQL export** | ✅ | ✅ | ❌ |
| **Excel export** | ✅ | ✅ | ❌ |
| **XML export** | ✅ | ❌ | ❌ |
| **YAML export** | ✅ | ❌ | ❌ |
| **Custom columns** | ✅ | ✅ | ❌ |
| **Data correlations** | ✅ | Limited | ❌ |
| **Null/Error injection** | ✅ | ❌ | ❌ |
| **PT-BR + EN-US** | ✅ | ❌ | Limited |
| **CPF/CNPJ + SSN/EIN** | ✅ | Limited | ❌ |
| **PWA** | ✅ | ❌ | ❌ |

---

## Features

### 120+ Data Fields across 19 Categories

| Category | Examples |
|---|---|
| 🆔 Identification | ID, UUID, CPF, CNPJ, SSN, EIN |
| 👤 Name | First Name, Last Name, Full Name, Nickname |
| 📧 Contact | Email, Phone, Website, LinkedIn, IP Address |
| 📍 Address | Street, City, State, ZIP Code, Country, Lat/Long |
| 💼 Professional | Company, Position, Sector, Salary, Seniority |
| 💰 Financial | Bank, Payment Method, Credit Card, Invoice |
| 📅 Dates | Birth Date, Timestamp, Due Date, Seasons |
| 🔢 Numbers | Age, Quantity, Percentage, Rating |
| 🏷️ Product | Product, Category, SKU, Barcode |
| 🧬 Personal Traits | Gender, Ethnicity, Zodiac, Nationality |
| 🎬 Entertainment | Movies, Music, Games, Sports |
| 💻 Technology | OS, Browser, Programming Language, Phone Brand |
| 🚗 Vehicle | Brand, Model, License Plate, Year |
| 🍕 Food & Drink | Cuisine, Restaurant, Dietary Restrictions |
| 🏥 Health | Blood Type, Allergies, Medications |
| 🎓 Education | University, Course, Degree, Grade |
| 🐾 Pet | Dog/Cat Breeds, Pet Names |
| 👗 Fashion | Clothing Type, Sizes, Brands |
| 📦 Other | Boolean, Lorem Ipsum, Sentences |

### 15 Quick Templates

One-click templates for common use cases:

| Template | Fields | Use Case |
|---|---|---|
| 👤 Person | 8 | Personal data profiles |
| 🏢 Company | 8 | Business directory |
| 🛒 Order | 11 | E-commerce simulation |
| 💼 Employee | 12 | HR records |
| 📦 Product | 10 | Product catalog |
| 👤 Customer | 10 | Customer database |
| 🏦 Bank Account | 10 | Financial data |
| 🚚 Logistics | 15 | Shipping simulation |
| 🏥 Patient | 15 | Medical records |
| 🎓 Student | 11 | Academic records |
| 🛍️ E-commerce | 21 | Full order data |
| 💻 SaaS User | 15 | User analytics |
| 📋 Lead | 12 | Sales pipeline |
| 🚗 Vehicle | 13 | Vehicle registry |
| 🎮 Streaming | 14 | Entertainment profiles |

### 7 Export Formats

| Format | Description |
|---|---|
| 📊 Table | Interactive paginated view (100 rows/page) |
| 📄 CSV | Comma-separated values |
| 📊 Excel | Native .xlsx binary file |
| `{ }` JSON | Pretty-printed JSON |
| 🗄️ SQL | CREATE TABLE + INSERT statements |
| 📰 XML | XML with configurable root elements |
| ⚙️ YAML | YAML list format |

### Smart Data Correlations

Generated data is internally consistent:

- **Gender** → determines first name, title (Mr./Mrs./Dr.)
- **Car brand** → determines model, fuel type, vehicle type
- **Product category** → determines name, price range, shipping
- **Age** → determines seniority, education, salary, hobbies
- **Country** → determines currency, nationality, timezone
- **Disease** → determines medication
- **And many more...**

### Additional Features

- **Custom Columns**: Add unlimited custom fields with SQL types (INT, VARCHAR, DATE, UUID, etc.)
- **Null Injection**: Randomly replace values with null (0-50% rate)
- **Error Injection**: Corrupt values for edge-case testing (0-50% rate)
- **Drag & Drop**: Reorder fields with intuitive drag-and-drop
- **Generation History**: Save and reload your last 10 generations
- **Dark/Light Theme**: Automatic system preference detection
- **Web Worker**: Large datasets (1000+) generate in background with progress bar
- **PWA**: Install as a Progressive Web App on any device
- **Bilingual**: Full English (EN-US) and Brazilian Portuguese (PT-BR) support

---

## Quick Start

### Option 1: Use the Live App

Visit **[fakedatabase.com](https://fakedatabase.com/)** and start generating data immediately.

### Option 2: Run Locally

```bash
# Clone the repository
git clone https://github.com/BrunoZBonetto/fake-data-generator.git
cd fake-data-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Option 3: Build for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [React 18](https://react.dev/) | UI framework |
| [TypeScript 5.6](https://www.typescriptlang.org/) | Type safety |
| [Vite 5](https://vitejs.dev/) | Build tool & dev server |
| [@dnd-kit](https://dndkit.com/) | Drag-and-drop field reordering |
| [SheetJS (xlsx)](https://sheetjs.com/) | Excel export |
| [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) | Progressive Web App |
| [Vitest](https://vitest.dev/) | Unit testing |

---

## Project Structure

```
src/
├── App.tsx                    # Root component
├── main.tsx                   # Entry point
├── components/
│   ├── DataGenerator.tsx      # Main orchestrator
│   ├── FieldSelector.tsx      # Field picker with categories
│   ├── SortableFields.tsx     # Drag-and-drop reordering
│   ├── OutputPreview.tsx      # Multi-format output viewer
│   ├── CustomFieldsEditor.tsx # Custom column editor
│   ├── TemplateSelector.tsx   # Quick template picker
│   ├── GenerationHistory.tsx  # History panel
│   ├── Toast.tsx              # Notification system
│   ├── SponsorBanner.tsx      # Sponsor CTA
│   └── SponsorModal.tsx       # Sponsor modal
├── engine/
│   ├── generator.ts           # Core data generator (120+ fields)
│   └── generator.worker.ts    # Web Worker for large datasets
├── templates/
│   └── presets.ts             # 15 quick-apply templates
├── dictionaries/              # Locale data files
│   ├── *.json                 # PT-BR dictionaries
│   └── en/*.json              # EN-US dictionaries
├── i18n/
│   ├── pt-BR.ts               # Portuguese translations
│   └── en-US.ts               # English translations
├── hooks/
│   └── useLocale.tsx          # Locale context provider
└── utils/
    ├── random.ts              # Utility functions
    ├── exporters.ts           # SQL, XML, YAML, Excel export
    ├── analytics.ts           # Google Analytics events
    ├── sponsor.ts             # Sponsor validation
    └── useTheme.ts            # Theme toggle
```

---

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## Support

If you find this tool useful, consider supporting the project:

- ⭐ Star this repository
- 🐛 [Report bugs](https://github.com/BrunoZBonetto/fake-data-generator/issues)
- 💡 [Request features](https://github.com/BrunoZBonetto/fake-data-generator/issues)
- 💰 [Sponsor on GitHub](https://github.com/sponsors/BrunoZBonetto)

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/BrunoZBonetto">Bruno Zanotti Bonetto</a>
</p>
