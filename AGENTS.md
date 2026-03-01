# Agent Guidelines

## Project Overview

VitePress plugin that renders color swatches next to CSS color values and Tailwind classes in markdown. Published on npm as `vitepress-plugin-color-preview`.

## Architecture

```
src/
├── colors.ts        # Color detection regex patterns, extractColor, findColorsInText
├── tailwind.ts      # Tailwind v3 default palette + extractTailwindColor
├── plugin.ts        # markdown-it plugin (inline code swatches + :::colors palettes)
├── transformer.ts   # Shiki transformer (fenced code block swatches)
├── client.ts        # Browser-side: hover tooltips, WCAG contrast, format conversion, click-to-copy
├── style.css        # All styles including dark mode support
└── index.ts         # Public API exports (server-side only)
```

Two entry points are built by tsup:

- `dist/index.js` — server-side (markdown-it plugin + Shiki transformer + utilities)
- `dist/client.js` — browser-side (setupColorPreview interactive features)
- `dist/style.css` — copied from src during build

## Key Concepts

- **Inline code**: `plugin.ts` overrides `md.renderer.rules.code_inline` to inject `<span class="color-swatch">` before color text
- **Fenced code blocks**: `transformer.ts` uses Shiki's `span` hook to inject swatches into tokenized code
- **Palette container**: `plugin.ts` registers a block rule for `:::colors ... :::` syntax
- **Tailwind detection**: Matches utility class patterns like `bg-blue-500` and resolves to hex via the palette map
- **Client interactivity**: Uses DOM event delegation (mouseover/mouseout/click) — works with VitePress SPA navigation
- **Color parsing on client**: Uses browser's CSS engine (`el.style.color` + `getComputedStyle`) to parse any CSS color to RGB

## Commands

```bash
npm run build        # Build with tsup (ESM + DTS + CSS copy)
npm run dev          # Watch mode
npm run typecheck    # tsc --noEmit
npm run lint         # ESLint on src/
npm run format       # Prettier on src/ and root config files
```

## Docs

Local VitePress site in `docs/` that imports directly from `src/` for development:

```bash
cd docs && npm install && npm run dev
```

Deployed automatically to GitHub Pages on push to main.

## Conventions

- ESM only (`"type": "module"`)
- No semicolons (Prettier config: `semi: false`)
- Single quotes, trailing commas
- Conventional commits enforced by commitlint (e.g. `feat:`, `fix:`, `docs:`, `chore:`)
- Pre-commit hook runs lint-staged (ESLint + Prettier on staged files)
- Never add `Co-Authored-By` to commits

## Adding a New Color Format

1. Add regex pattern in `src/colors.ts`
2. Add it to the `COLOR_PATTERN` combined regex (order matters — longer patterns first)
3. Test in playground with inline code and fenced code blocks
4. If the format needs special client-side parsing, the browser's `getComputedStyle` handles it automatically

## Adding a New Tailwind Utility Prefix

Add the prefix to `TW_PREFIXES` in `src/tailwind.ts`.

## Publishing

```bash
npm version patch|minor|major
npm run build
npm publish
git push origin main --tags
```
