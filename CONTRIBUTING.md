# Contributing

Thanks for your interest in contributing!

## Setup

```bash
git clone https://github.com/KlangHaus/vitepress-plugin-color-preview.git
cd vitepress-plugin-color-preview
npm install
```

## Development

```bash
npm run dev          # Watch mode — rebuilds on changes
npm run build        # Production build
npm run typecheck    # Type check
```

## Docs

Test your changes in the local VitePress docs site:

```bash
cd docs
npm install
npm run dev
```

The docs site imports directly from `src/`, so changes are reflected immediately.

## Pull requests

1. Fork the repo and create a branch from `main`
2. Make your changes
3. Ensure `npm run build` and `npm run typecheck` pass
4. Test in the playground
5. Open a PR
