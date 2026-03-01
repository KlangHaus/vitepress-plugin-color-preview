/** Regex patterns for matching CSS color values */

const HEX8 = /#[0-9a-fA-F]{8}\b/
const HEX6 = /#[0-9a-fA-F]{6}\b/
const HEX4 = /#[0-9a-fA-F]{4}\b/
const HEX3 = /#[0-9a-fA-F]{3}\b/
const RGBA = /rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*[\d.]+\s*\)/
const RGB_MODERN = /rgb\(\s*\d{1,3}\s+\d{1,3}\s+\d{1,3}\s*(?:\/\s*[\d.]+%?\s*)?\)/
const RGB = /rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)/
const HSLA = /hsla\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*[\d.]+\s*\)/
const HSL_MODERN = /hsl\(\s*\d{1,3}\s+\d{1,3}%\s+\d{1,3}%\s*(?:\/\s*[\d.]+%?\s*)?\)/
const HSL = /hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)/
const OKLCH = /oklch\(\s*[\d.]+%?\s+[\d.]+\s+[\d.]+\s*(?:\/\s*[\d.]+%?\s*)?\)/
const OKLAB = /oklab\(\s*[\d.]+%?\s+[\d.-]+\s+[\d.-]+\s*(?:\/\s*[\d.]+%?\s*)?\)/

const NAMED_COLORS = new Set([
  'aliceblue',
  'antiquewhite',
  'aqua',
  'aquamarine',
  'azure',
  'beige',
  'bisque',
  'black',
  'blanchedalmond',
  'blue',
  'blueviolet',
  'brown',
  'burlywood',
  'cadetblue',
  'chartreuse',
  'chocolate',
  'coral',
  'cornflowerblue',
  'cornsilk',
  'crimson',
  'cyan',
  'darkblue',
  'darkcyan',
  'darkgoldenrod',
  'darkgray',
  'darkgreen',
  'darkgrey',
  'darkkhaki',
  'darkmagenta',
  'darkolivegreen',
  'darkorange',
  'darkorchid',
  'darkred',
  'darksalmon',
  'darkseagreen',
  'darkslateblue',
  'darkslategray',
  'darkslategrey',
  'darkturquoise',
  'darkviolet',
  'deeppink',
  'deepskyblue',
  'dimgray',
  'dimgrey',
  'dodgerblue',
  'firebrick',
  'floralwhite',
  'forestgreen',
  'fuchsia',
  'gainsboro',
  'ghostwhite',
  'gold',
  'goldenrod',
  'gray',
  'green',
  'greenyellow',
  'grey',
  'honeydew',
  'hotpink',
  'indianred',
  'indigo',
  'ivory',
  'khaki',
  'lavender',
  'lavenderblush',
  'lawngreen',
  'lemonchiffon',
  'lightblue',
  'lightcoral',
  'lightcyan',
  'lightgoldenrodyellow',
  'lightgray',
  'lightgreen',
  'lightgrey',
  'lightpink',
  'lightsalmon',
  'lightseagreen',
  'lightskyblue',
  'lightslategray',
  'lightslategrey',
  'lightsteelblue',
  'lightyellow',
  'lime',
  'limegreen',
  'linen',
  'magenta',
  'maroon',
  'mediumaquamarine',
  'mediumblue',
  'mediumorchid',
  'mediumpurple',
  'mediumseagreen',
  'mediumslateblue',
  'mediumspringgreen',
  'mediumturquoise',
  'mediumvioletred',
  'midnightblue',
  'mintcream',
  'mistyrose',
  'moccasin',
  'navajowhite',
  'navy',
  'oldlace',
  'olive',
  'olivedrab',
  'orange',
  'orangered',
  'orchid',
  'palegoldenrod',
  'palegreen',
  'paleturquoise',
  'palevioletred',
  'papayawhip',
  'peachpuff',
  'peru',
  'pink',
  'plum',
  'powderblue',
  'purple',
  'rebeccapurple',
  'red',
  'rosybrown',
  'royalblue',
  'saddlebrown',
  'salmon',
  'sandybrown',
  'seagreen',
  'seashell',
  'sienna',
  'silver',
  'skyblue',
  'slateblue',
  'slategray',
  'slategrey',
  'snow',
  'springgreen',
  'steelblue',
  'tan',
  'teal',
  'thistle',
  'tomato',
  'turquoise',
  'violet',
  'wheat',
  'white',
  'whitesmoke',
  'yellow',
  'yellowgreen',
])

/**
 * Combined regex that matches CSS color values within a larger string.
 * Order matters — longer hex patterns must come before shorter ones.
 */
const COLOR_PATTERN = new RegExp(
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
    OKLAB.source,
  ].join('|'),
  'gi',
)

/**
 * Check if an entire string is exactly a named CSS color.
 */
export function isNamedColor(text: string): boolean {
  return NAMED_COLORS.has(text.trim().toLowerCase())
}

/**
 * Extract the first CSS color value from a string,
 * or return the string itself if it's a named color.
 * Only matches if the color IS the entire content.
 */
export function extractColor(text: string): string | null {
  const trimmed = text.trim()

  if (isNamedColor(trimmed)) {
    return trimmed
  }

  COLOR_PATTERN.lastIndex = 0
  const match = COLOR_PATTERN.exec(trimmed)

  if (match && match[0].length === trimmed.length) {
    return match[0]
  }

  return null
}

export interface ColorMatch {
  value: string
  index: number
  length: number
}

/**
 * Find all CSS color values within a string.
 * Used for fenced code blocks where colors appear within larger text.
 */
export function findColorsInText(text: string): ColorMatch[] {
  const results: ColorMatch[] = []
  COLOR_PATTERN.lastIndex = 0

  let match: RegExpExecArray | null
  while ((match = COLOR_PATTERN.exec(text)) !== null) {
    results.push({
      value: match[0],
      index: match.index,
      length: match[0].length,
    })
  }

  return results
}
