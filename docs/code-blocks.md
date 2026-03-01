# Code Block Color Swatches

Color values inside fenced code blocks get inline swatches.

## CSS

```css
:root {
  --primary: #3b82f6;
  --secondary: #8b5cf6;
  --success: #22c55e;
  --warning: #f59e0b;
  --danger: #ef4444;
  --background: #f8fafc;
  --text: #1e293b;
}

.button {
  background-color: rgb(59, 130, 246);
  border: 2px solid hsl(217, 91%, 60%);
  color: white;
}

.alert {
  background: rgba(239, 68, 68, 0.1);
  border-left: 4px solid #ef4444;
}
```

## SCSS

```scss
$colors: (
  'brand': #6366f1,
  'accent': #ec4899,
  'muted': #94a3b8,
);

.card {
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-top: 3px solid #6366f1;
}
```

## JavaScript / TypeScript

```ts
const theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    background: '#ffffff',
    text: '#1e293b',
    border: 'rgba(0, 0, 0, 0.1)',
  },
}
```

## Tailwind Config

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: '#6366f1',
        accent: '#ec4899',
      },
    },
  },
}
```
