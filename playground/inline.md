# Inline Color Swatches

Color values inside inline code blocks automatically get a swatch preview.

## Hex Colors

- 3-digit: `#f00` `#0f0` `#00f` `#fff`
- 6-digit: `#ff6600` `#3b82f6` `#10b981` `#1e293b`
- 8-digit (alpha): `#ff660080` `#3b82f6cc`

## RGB / RGBA

- `rgb(255, 100, 0)`
- `rgb(59, 130, 246)`
- `rgba(239, 68, 68, 0.5)`
- Modern syntax: `rgb(255 100 0 / 50%)`

## HSL / HSLA

- `hsl(30, 100%, 50%)`
- `hsl(217, 91%, 60%)`
- `hsla(0, 84%, 60%, 0.5)`
- Modern syntax: `hsl(142 71% 45% / 80%)`

## Named Colors

`red` `blue` `green` `coral` `tomato` `cornflowerblue`
`rebeccapurple` `hotpink` `darkslategray` `gold`

## No Match (should render as normal code)

These should NOT get swatches:

`not-a-color` `hello` `123` `#xyz` `rgb(wrong)`
