# Understanding Design Tokens

Design tokens are the single source of truth for your design system's visual properties. This page explains what they are, why they matter, and how to document them effectively.

## What are design tokens?

A design token is a named value that represents a design decision. Instead of using raw values like `#2563eb` throughout your codebase, you assign it a semantic name like `primary` and reference the token everywhere.

:::colors
| Color | Token | CSS Variable |
| ------- | ------- | ----------------- |
| #2563eb | primary | --color-primary |
:::

The token `primary` always resolves to `#2563eb`. When the brand color changes, you update it in one place and the entire system follows.

## Why use design tokens?

### Consistency

Without tokens, the same blue might appear as `#2563eb` in one file, `#2564eb` in another (a typo), and `rgb(37, 99, 235)` in a third. Tokens eliminate this drift.

### Semantic meaning

Raw colors don't communicate intent. `#dc2626` could be anything — but `danger` tells you exactly what it's for. This makes code reviews easier and prevents misuse.

### Theming

Tokens decouple intent from value. The token `background` can resolve to `#ffffff` in light mode and `#0a0a0a` in dark mode:

:::colors-compare
| Token | Light | Dark |
| ---------- | ------- | ------- |
| background | #ffffff | #0a0a0a |
| surface | #f5f5f5 | #171717 |
| text | #1e293b | #f8fafc |
| muted | #64748b | #94a3b8 |
:::

### Handoff

Tokens bridge the gap between design and development. Designers define `primary-500`, developers consume `--color-primary-500`. Both speak the same language.

## Anatomy of a design token

A well-defined token typically has:

| Part             | Example               | Purpose                       |
| ---------------- | --------------------- | ----------------------------- |
| **Name**         | `primary`             | Human-readable identifier     |
| **Value**        | `#2563eb`             | The actual color              |
| **CSS variable** | `--color-primary`     | How it's consumed in code     |
| **Purpose**      | "Primary brand color" | When to use (and when not to) |

The [Token Table](/tokens) feature lets you document all of these in a single block:

:::colors
| Color | Token | CSS Variable | Purpose |
| ------- | ------- | ------------------- | ------------------- |
| #2563eb | primary | --color-primary | Buttons, links, CTA |
| #dc2626 | danger | --color-danger | Errors, destructive |
| #16a34a | success | --color-success | Confirmations, valid |
| #d97706 | warning | --color-warning | Caution, attention |
:::

## Token naming conventions

There's no single right way to name tokens, but most systems follow a pattern:

### Flat naming

Simple and direct. Works well for small systems.

:::colors
| Color | Token |
| ------- | ---------- |
| #2563eb | primary |
| #1d4ed8 | primaryHover |
| #dc2626 | danger |
| #16a34a | success |
:::

### Scale naming

Uses numeric scales (like Tailwind). Good for precise control over shades.

:::colors
| Color | Token |
| ------- | ---------- |
| #dbeafe | blue-100 |
| #93c5fd | blue-300 |
| #3b82f6 | blue-500 |
| #1d4ed8 | blue-700 |
| #1e3a8a | blue-900 |
:::

### Semantic + role naming

Separates palette from purpose. The most scalable approach.

:::colors
| Color | Token | Usage |
| ------- | ------------------- | ---------------------- |
| #2563eb | action-primary | Primary buttons |
| #1d4ed8 | action-primary-hover | Primary button hover |
| #dc2626 | feedback-error | Error messages |
| #16a34a | feedback-success | Success confirmations |
| #f8fafc | surface-page | Page background |
| #f1f5f9 | surface-card | Card background |
:::

## Documenting with this plugin

This plugin gives you several ways to document your tokens:

| Feature                                              | Best for                                   |
| ---------------------------------------------------- | ------------------------------------------ |
| [Token Table](/tokens) (`:::colors`)                 | Full token reference with metadata columns |
| [Color Palettes](/palette) (`:::colors`)             | Quick visual overview of a color set       |
| [Color Strips](/strip) (`:::colors-strip`)           | Showing gradients and sequential scales    |
| [Token Comparison](/compare) (`:::colors-compare`)   | Comparing states, variants, or scales      |
| [Contrast Checker](/contrast) (`:::colors-contrast`) | Validating accessibility of fg/bg pairs    |

## Tips

1. **Document every token** — if it's in the code, it should be in the docs. Undocumented tokens get misused.
2. **Show context, not just color** — include the CSS variable name and a short purpose so developers know how to use it.
3. **Group logically** — separate brand colors, status colors, surface colors, and text colors into their own tables.
4. **Check contrast** — use the [Contrast Checker](/contrast) to verify that your text/background pairs meet [WCAG standards](/understanding-contrast).
5. **Keep it updated** — token docs that drift from reality are worse than no docs at all.
