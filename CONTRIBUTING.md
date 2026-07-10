# Contributing to Fake Database

Thank you for your interest in contributing! This guide will help you get started.

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ (recommended: 20 LTS)
- [npm](https://www.npmjs.com/) 9+

### Getting Started

```bash
# Fork the repository on GitHub

# Clone your fork
git clone https://github.com/YOUR_USERNAME/fake-data-generator.git
cd fake-data-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Run ESLint with auto-fix |
| `npm run test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |

---

## How to Contribute

### 1. Reporting Bugs

- Check [existing issues](https://github.com/BrunoZBonetto/fake-data-generator/issues) first
- Open a new issue with:
  - Clear title and description
  - Steps to reproduce
  - Expected vs actual behavior
  - Browser and OS info
  - Screenshots if applicable

### 2. Suggesting Features

- Open an issue with the `enhancement` label
- Describe the feature, why it's useful, and how it should work
- Include mockups or examples if possible

### 3. Adding Data Fields

The easiest way to contribute! To add a new fake data field:

1. **Choose a category** (e.g., `nome`, `contato`, `financeiro`)
2. **Add the dictionary entries** in both locales:
   - `src/dictionaries/your_category.json` (PT-BR)
   - `src/dictionaries/en/your_category.json` (EN-US)
3. **Add the generator function** in `src/engine/generator.ts`
4. **Add the field label** in both i18n files:
   - `src/i18n/pt-BR.ts`
   - `src/i18n/en-US.ts`
5. **Add the SQL type mapping** in `src/utils/exporters.ts` (if needed)
6. **Add tests** if applicable

### 4. Adding Templates

To add a new quick template:

1. Open `src/templates/presets.ts`
2. Add a new template entry with a unique key, fields array, and metadata
3. Add the template label in both i18n files

### 5. Adding Translations

To add a new language:

1. Create `src/i18n/your_locale.ts` based on `en-US.ts`
2. Create dictionary files in `src/dictionaries/your_locale/`
3. Register the locale in `src/hooks/useLocale.tsx`
4. Add the locale to the hreflang tags in `index.html`

### 6. Submitting Pull Requests

1. Create a feature branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. Make your changes
3. Run lint and tests:
   ```bash
   npm run lint
   npm run test
   ```
4. Commit with a clear message:
   ```bash
   git commit -m "feat: add new data field for X"
   ```
5. Push and create a Pull Request

---

## Code Style

- **TypeScript** for all new code
- **Functional components** with hooks (no class components)
- **ESLint** rules must pass — run `npm run lint` before committing
- **Meaningful variable names** — prefer `fullName` over `fn`
- **No inline styles** — use CSS classes
- **No comments** unless absolutely necessary for complex logic

### Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Use Case |
|---|---|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `docs:` | Documentation |
| `style:` | Code style (no logic change) |
| `refactor:` | Code refactoring |
| `test:` | Adding tests |
| `chore:` | Build/tooling changes |

---

## Project Architecture

### Key Concepts

- **Correlation Engine**: Fields are not generated independently. The generator uses a correlation system where one field's value influences related fields (e.g., gender → first name, car brand → car model).
- **Locale-Aware**: All data adapts to the selected locale (PT-BR or EN-US), including date formats, phone numbers, tax IDs, and cultural references.
- **Web Worker**: Generating 1000+ records runs in a Web Worker to keep the UI responsive.

---

## Questions?

Open an issue or reach out to [@BrunoZBonetto](https://github.com/BrunoZBonetto).
