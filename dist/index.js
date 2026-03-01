// src/colors.ts
var HEX8 = /#[0-9a-fA-F]{8}\b/;
var HEX6 = /#[0-9a-fA-F]{6}\b/;
var HEX4 = /#[0-9a-fA-F]{4}\b/;
var HEX3 = /#[0-9a-fA-F]{3}\b/;
var RGBA = /rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*[\d.]+\s*\)/;
var RGB_MODERN = /rgb\(\s*\d{1,3}\s+\d{1,3}\s+\d{1,3}\s*(?:\/\s*[\d.]+%?\s*)?\)/;
var RGB = /rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)/;
var HSLA = /hsla\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*[\d.]+\s*\)/;
var HSL_MODERN = /hsl\(\s*\d{1,3}\s+\d{1,3}%\s+\d{1,3}%\s*(?:\/\s*[\d.]+%?\s*)?\)/;
var HSL = /hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)/;
var OKLCH = /oklch\(\s*[\d.]+%?\s+[\d.]+\s+[\d.]+\s*(?:\/\s*[\d.]+%?\s*)?\)/;
var OKLAB = /oklab\(\s*[\d.]+%?\s+[\d.-]+\s+[\d.-]+\s*(?:\/\s*[\d.]+%?\s*)?\)/;
var NAMED_COLORS = /* @__PURE__ */ new Set([
  "aliceblue",
  "antiquewhite",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkgrey",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkslategrey",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dimgrey",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "green",
  "greenyellow",
  "grey",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightblue",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgreen",
  "lightgrey",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightslategrey",
  "lightsteelblue",
  "lightyellow",
  "lime",
  "limegreen",
  "linen",
  "magenta",
  "maroon",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "navy",
  "oldlace",
  "olive",
  "olivedrab",
  "orange",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "purple",
  "rebeccapurple",
  "red",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "silver",
  "skyblue",
  "slateblue",
  "slategray",
  "slategrey",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "white",
  "whitesmoke",
  "yellow",
  "yellowgreen"
]);
var COLOR_PATTERN = new RegExp(
  [
    HEX8.source,
    HEX6.source,
    HEX4.source,
    HEX3.source,
    RGBA.source,
    RGB_MODERN.source,
    RGB.source,
    HSLA.source,
    HSL_MODERN.source,
    HSL.source,
    OKLCH.source,
    OKLAB.source
  ].join("|"),
  "gi"
);
function isNamedColor(text) {
  return NAMED_COLORS.has(text.trim().toLowerCase());
}
function extractColor(text) {
  const trimmed = text.trim();
  if (isNamedColor(trimmed)) {
    return trimmed;
  }
  COLOR_PATTERN.lastIndex = 0;
  const match = COLOR_PATTERN.exec(trimmed);
  if (match && match[0].length === trimmed.length) {
    return match[0];
  }
  return null;
}
function findColorsInText(text) {
  const results = [];
  COLOR_PATTERN.lastIndex = 0;
  let match;
  while ((match = COLOR_PATTERN.exec(text)) !== null) {
    results.push({
      value: match[0],
      index: match.index,
      length: match[0].length
    });
  }
  return results;
}

// src/tailwind.ts
var TAILWIND_COLORS = {
  slate: {
    "50": "#f8fafc",
    "100": "#f1f5f9",
    "200": "#e2e8f0",
    "300": "#cbd5e1",
    "400": "#94a3b8",
    "500": "#64748b",
    "600": "#475569",
    "700": "#334155",
    "800": "#1e293b",
    "900": "#0f172a",
    "950": "#020617"
  },
  gray: {
    "50": "#f9fafb",
    "100": "#f3f4f6",
    "200": "#e5e7eb",
    "300": "#d1d5db",
    "400": "#9ca3af",
    "500": "#6b7280",
    "600": "#4b5563",
    "700": "#374151",
    "800": "#1f2937",
    "900": "#111827",
    "950": "#030712"
  },
  zinc: {
    "50": "#fafafa",
    "100": "#f4f4f5",
    "200": "#e4e4e7",
    "300": "#d4d4d8",
    "400": "#a1a1aa",
    "500": "#71717a",
    "600": "#52525b",
    "700": "#3f3f46",
    "800": "#27272a",
    "900": "#18181b",
    "950": "#09090b"
  },
  neutral: {
    "50": "#fafafa",
    "100": "#f5f5f5",
    "200": "#e5e5e5",
    "300": "#d4d4d4",
    "400": "#a3a3a3",
    "500": "#737373",
    "600": "#525252",
    "700": "#404040",
    "800": "#262626",
    "900": "#171717",
    "950": "#0a0a0a"
  },
  stone: {
    "50": "#fafaf9",
    "100": "#f5f5f4",
    "200": "#e7e5e4",
    "300": "#d6d3d1",
    "400": "#a8a29e",
    "500": "#78716c",
    "600": "#57534e",
    "700": "#44403c",
    "800": "#292524",
    "900": "#1c1917",
    "950": "#0c0a09"
  },
  red: {
    "50": "#fef2f2",
    "100": "#fee2e2",
    "200": "#fecaca",
    "300": "#fca5a5",
    "400": "#f87171",
    "500": "#ef4444",
    "600": "#dc2626",
    "700": "#b91c1c",
    "800": "#991b1b",
    "900": "#7f1d1d",
    "950": "#450a0a"
  },
  orange: {
    "50": "#fff7ed",
    "100": "#ffedd5",
    "200": "#fed7aa",
    "300": "#fdba74",
    "400": "#fb923c",
    "500": "#f97316",
    "600": "#ea580c",
    "700": "#c2410c",
    "800": "#9a3412",
    "900": "#7c2d12",
    "950": "#431407"
  },
  amber: {
    "50": "#fffbeb",
    "100": "#fef3c7",
    "200": "#fde68a",
    "300": "#fcd34d",
    "400": "#fbbf24",
    "500": "#f59e0b",
    "600": "#d97706",
    "700": "#b45309",
    "800": "#92400e",
    "900": "#78350f",
    "950": "#451a03"
  },
  yellow: {
    "50": "#fefce8",
    "100": "#fef9c3",
    "200": "#fef08a",
    "300": "#fde047",
    "400": "#facc15",
    "500": "#eab308",
    "600": "#ca8a04",
    "700": "#a16207",
    "800": "#854d0e",
    "900": "#713f12",
    "950": "#422006"
  },
  lime: {
    "50": "#f7fee7",
    "100": "#ecfccb",
    "200": "#d9f99d",
    "300": "#bef264",
    "400": "#a3e635",
    "500": "#84cc16",
    "600": "#65a30d",
    "700": "#4d7c0f",
    "800": "#3f6212",
    "900": "#365314",
    "950": "#1a2e05"
  },
  green: {
    "50": "#f0fdf4",
    "100": "#dcfce7",
    "200": "#bbf7d0",
    "300": "#86efac",
    "400": "#4ade80",
    "500": "#22c55e",
    "600": "#16a34a",
    "700": "#15803d",
    "800": "#166534",
    "900": "#14532d",
    "950": "#052e16"
  },
  emerald: {
    "50": "#ecfdf5",
    "100": "#d1fae5",
    "200": "#a7f3d0",
    "300": "#6ee7b7",
    "400": "#34d399",
    "500": "#10b981",
    "600": "#059669",
    "700": "#047857",
    "800": "#065f46",
    "900": "#064e3b",
    "950": "#022c22"
  },
  teal: {
    "50": "#f0fdfa",
    "100": "#ccfbf1",
    "200": "#99f6e4",
    "300": "#5eead4",
    "400": "#2dd4bf",
    "500": "#14b8a6",
    "600": "#0d9488",
    "700": "#0f766e",
    "800": "#115e59",
    "900": "#134e4a",
    "950": "#042f2e"
  },
  cyan: {
    "50": "#ecfeff",
    "100": "#cffafe",
    "200": "#a5f3fc",
    "300": "#67e8f9",
    "400": "#22d3ee",
    "500": "#06b6d4",
    "600": "#0891b2",
    "700": "#0e7490",
    "800": "#155e75",
    "900": "#164e63",
    "950": "#083344"
  },
  sky: {
    "50": "#f0f9ff",
    "100": "#e0f2fe",
    "200": "#bae6fd",
    "300": "#7dd3fc",
    "400": "#38bdf8",
    "500": "#0ea5e9",
    "600": "#0284c7",
    "700": "#0369a1",
    "800": "#075985",
    "900": "#0c4a6e",
    "950": "#082f49"
  },
  blue: {
    "50": "#eff6ff",
    "100": "#dbeafe",
    "200": "#bfdbfe",
    "300": "#93c5fd",
    "400": "#60a5fa",
    "500": "#3b82f6",
    "600": "#2563eb",
    "700": "#1d4ed8",
    "800": "#1e40af",
    "900": "#1e3a8a",
    "950": "#172554"
  },
  indigo: {
    "50": "#eef2ff",
    "100": "#e0e7ff",
    "200": "#c7d2fe",
    "300": "#a5b4fc",
    "400": "#818cf8",
    "500": "#6366f1",
    "600": "#4f46e5",
    "700": "#4338ca",
    "800": "#3730a3",
    "900": "#312e81",
    "950": "#1e1b4b"
  },
  violet: {
    "50": "#f5f3ff",
    "100": "#ede9fe",
    "200": "#ddd6fe",
    "300": "#c4b5fd",
    "400": "#a78bfa",
    "500": "#8b5cf6",
    "600": "#7c3aed",
    "700": "#6d28d9",
    "800": "#5b21b6",
    "900": "#4c1d95",
    "950": "#2e1065"
  },
  purple: {
    "50": "#faf5ff",
    "100": "#f3e8ff",
    "200": "#e9d5ff",
    "300": "#d8b4fe",
    "400": "#c084fc",
    "500": "#a855f7",
    "600": "#9333ea",
    "700": "#7e22ce",
    "800": "#6b21a8",
    "900": "#581c87",
    "950": "#3b0764"
  },
  fuchsia: {
    "50": "#fdf4ff",
    "100": "#fae8ff",
    "200": "#f5d0fe",
    "300": "#f0abfc",
    "400": "#e879f9",
    "500": "#d946ef",
    "600": "#c026d3",
    "700": "#a21caf",
    "800": "#86198f",
    "900": "#701a75",
    "950": "#4a044e"
  },
  pink: {
    "50": "#fdf2f8",
    "100": "#fce7f3",
    "200": "#fbcfe8",
    "300": "#f9a8d4",
    "400": "#f472b6",
    "500": "#ec4899",
    "600": "#db2777",
    "700": "#be185d",
    "800": "#9d174d",
    "900": "#831843",
    "950": "#500724"
  },
  rose: {
    "50": "#fff1f2",
    "100": "#ffe4e6",
    "200": "#fecdd3",
    "300": "#fda4af",
    "400": "#fb7185",
    "500": "#f43f5e",
    "600": "#e11d48",
    "700": "#be123c",
    "800": "#9f1239",
    "900": "#881337",
    "950": "#4c0519"
  }
};
var TW_PREFIXES = "(?:bg|text|border|ring|shadow|accent|outline|decoration|fill|stroke|from|via|to|divide|placeholder)";
var TW_COLORS = "(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)";
var TW_SHADES = "(?:50|100|200|300|400|500|600|700|800|900|950)";
var TAILWIND_PATTERN = new RegExp(
  `^${TW_PREFIXES}-(${TW_COLORS})-(${TW_SHADES})$`
);
var TAILWIND_SIMPLE_PATTERN = new RegExp(
  `^${TW_PREFIXES}-(black|white)$`
);
function extractTailwindColor(text) {
  const trimmed = text.trim();
  const match = trimmed.match(TAILWIND_PATTERN);
  if (match) {
    const [, colorName, shade] = match;
    return TAILWIND_COLORS[colorName]?.[shade] ?? null;
  }
  const simpleMatch = trimmed.match(TAILWIND_SIMPLE_PATTERN);
  if (simpleMatch) {
    const [, color] = simpleMatch;
    if (color === "black") return "#000000";
    if (color === "white") return "#ffffff";
  }
  return null;
}

// src/plugin.ts
function colorPreviewPlugin(md) {
  inlineCodeRule(md);
  paletteContainerRule(md);
}
function inlineCodeRule(md) {
  const defaultRenderer = md.renderer.rules.code_inline;
  md.renderer.rules.code_inline = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const content = token.content;
    const escaped = md.utils.escapeHtml(content);
    const cssColor = extractColor(content);
    if (cssColor) {
      const escapedColor = md.utils.escapeHtml(cssColor);
      return `<code class="color-preview"><span class="color-swatch" style="--swatch: ${escapedColor}" data-color="${escapedColor}"></span>${escaped}</code>`;
    }
    const twColor = extractTailwindColor(content);
    if (twColor) {
      const escapedColor = md.utils.escapeHtml(twColor);
      return `<code class="color-preview"><span class="color-swatch" style="--swatch: ${escapedColor}" data-color="${escapedColor}"></span>${escaped}</code>`;
    }
    if (defaultRenderer) {
      return defaultRenderer(tokens, idx, options, env, self);
    }
    return `<code>${escaped}</code>`;
  };
}
function paletteContainerRule(md) {
  md.block.ruler.before(
    "fence",
    "color_palette",
    (state, startLine, endLine, silent) => {
      const startPos = state.bMarks[startLine] + state.tShift[startLine];
      const startMax = state.eMarks[startLine];
      const lineText = state.src.slice(startPos, startMax).trim();
      if (!lineText.startsWith(":::colors")) return false;
      if (silent) return true;
      let nextLine = startLine + 1;
      while (nextLine < endLine) {
        const pos = state.bMarks[nextLine] + state.tShift[nextLine];
        const max = state.eMarks[nextLine];
        const line = state.src.slice(pos, max).trim();
        if (line === ":::") break;
        nextLine++;
      }
      const contentLines = [];
      for (let i = startLine + 1; i < nextLine; i++) {
        const pos = state.bMarks[i] + state.tShift[i];
        const max = state.eMarks[i];
        contentLines.push(state.src.slice(pos, max));
      }
      const token = state.push("color_palette", "div", 0);
      token.content = contentLines.join("\n");
      token.map = [startLine, nextLine + 1];
      state.line = nextLine + 1;
      return true;
    }
  );
  md.renderer.rules.color_palette = (tokens, idx) => {
    const content = tokens[idx].content;
    const colors = content.split(/\s+/).filter(Boolean);
    const swatches = colors.map((c) => {
      const escaped = md.utils.escapeHtml(c);
      return `<div class="palette-item"><div class="palette-swatch" style="--swatch: ${escaped}" data-color="${escaped}"></div><span class="palette-label">${escaped}</span></div>`;
    }).join("");
    return `<div class="color-palette">${swatches}</div>`;
  };
}

// src/transformer.ts
function colorPreviewTransformer() {
  return {
    name: "color-preview",
    span(node) {
      const textChildren = node.children.filter(
        (c) => c.type === "text"
      );
      if (textChildren.length === 0) return;
      const fullText = textChildren.map((c) => c.value).join("");
      const colors = findColorsInText(fullText);
      if (colors.length > 0) {
        injectSwatch(node, colors[0].value);
        return;
      }
      const tokens = fullText.split(/\s+/).filter(Boolean);
      for (const token of tokens) {
        const twColor = extractTailwindColor(token);
        if (twColor) {
          injectSwatch(node, twColor);
          return;
        }
      }
    }
  };
}
function injectSwatch(node, color) {
  const swatch = {
    type: "element",
    tagName: "span",
    properties: {
      class: "color-swatch code-swatch",
      style: `--swatch: ${color}`,
      "data-color": color
    },
    children: []
  };
  node.children.unshift(swatch);
}
export {
  colorPreviewPlugin,
  colorPreviewTransformer,
  extractColor,
  extractTailwindColor,
  findColorsInText,
  isNamedColor
};
