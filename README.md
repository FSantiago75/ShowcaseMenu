# Showcase Menu

A responsive digital catalog focused on fast product discovery, category filtering and a polished browsing experience.

## Stack

- React
- TypeScript
- Vite
- CSS with native custom properties and responsive layout
- Prettier

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Code quality

```bash
npm run type-check
npm run format-check
```

## Structure

```text
src/
├── components/       # One folder per visual component
│   └── Component/
│       ├── index.tsx
│       └── Component.css
├── config/           # Declarative business rules and schedules
├── data/             # Temporary catalog source
├── hooks/            # Focused interaction and animation behavior
├── styles/           # Global tokens and browser defaults only
├── types/            # Shared domain contracts
└── utils/            # Small reusable transformations
```

CSS classes use kebab-case. Component logic uses typed props, and business rules stay outside visual components.

The current catalog data and images are temporary development references and must be replaced before public deployment.
