# Design Tokens

Document your design system colors with a structured token table inside `:::colors` blocks.

## Usage

Use markdown table syntax inside a `:::colors` block. The first column must be a color value, and the remaining columns can be any metadata you need:

```md
:::colors
| Color | Token | CSS Variable | Purpose |
| ------- | ------- | ----------------- | ------------------- |
| #0059b3 | primary | --color-primary | Primary brand color |
| #3381cc | light | --color-light | Lighter shade |
| #003a7a | dark | --color-dark | Darker shade |
:::
```

The header row and separator row (`---`) are optional. If included, they become column headers. The first column is always rendered as a swatch + color value.

::: info Requirement
This feature requires `colorPreviewPlugin` in your VitePress config. See [Getting Started](/getting-started) for setup.
:::

## Examples

### Brand Palette

:::colors
| Color | Token | CSS Variable | Purpose |
| ------- | ------------ | ------------------------- | -------------------------- |
| #0059b3 | primary | --color-primary | Primary brand color |
| #3381cc | primaryLight | --color-primary-light | Lighter shade (hover) |
| #003a7a | primaryDark | --color-primary-dark | Darker shade (active) |
| #ffffff | onPrimary | --color-on-primary | Text on primary background |
| #6c757d | secondary | --color-secondary | Secondary brand color |
| #868e96 | secondaryLight | --color-secondary-light | Lighter secondary shade |
| #494f54 | secondaryDark | --color-secondary-dark | Darker secondary shade |
:::

### Status Colors

:::colors
| Color | Token | CSS Variable | Purpose |
| ------- | ------- | ----------------- | ---------------------- |
| #22c55e | success | --color-success | Success feedback |
| #f59e0b | warning | --color-warning | Warning alerts |
| #ef4444 | danger | --color-danger | Error states |
| #3b82f6 | info | --color-info | Informational messages |
:::

### Without Headers

You can skip the header and separator rows — columns render without labels:

:::colors
| #0059b3 | primary | --color-primary | Primary brand color |
| #3381cc | primaryLight | --color-primary-light | Lighter shade |
| #003a7a | primaryDark | --color-primary-dark | Darker shade |
:::

### Minimal (Two Columns)

:::colors
| Color | Token |
| ------- | --------- |
| #ef4444 | danger |
| #f97316 | warning |
| #eab308 | caution |
| #22c55e | success |
| #3b82f6 | info |
:::

### Tailwind Tokens

Tailwind classes also work in the color column:

:::colors
| Color | Token | Usage |
| ----------- | --------- | ------------------ |
| bg-blue-500 | primary | Buttons, links |
| bg-gray-100 | surface | Card backgrounds |
| bg-red-500 | error | Error messages |
| bg-green-500| success | Success indicators |
:::
