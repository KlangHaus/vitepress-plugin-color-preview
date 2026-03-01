import { defineConfig } from 'vitepress'
import { colorPreviewPlugin, colorPreviewTransformer } from '../../src/index'

export default defineConfig({
  title: 'Color Preview Playground',
  description: 'Test all features of vitepress-plugin-color-preview',
  base: '/vitepress-plugin-color-preview/',
  themeConfig: {
    sidebar: [
      {
        text: 'Features',
        items: [
          { text: 'Inline Colors', link: '/inline' },
          { text: 'Code Blocks', link: '/code-blocks' },
          { text: 'Color Palette', link: '/palette' },
          { text: 'Tailwind Classes', link: '/tailwind' },
          { text: 'All Formats', link: '/formats' },
        ],
      },
    ],
  },
  markdown: {
    config(md) {
      md.use(colorPreviewPlugin)
    },
    codeTransformers: [colorPreviewTransformer()],
  },
})
