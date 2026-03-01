import { defineConfig } from 'tsup'
import { copyFileSync } from 'node:fs'

export default defineConfig({
  entry: ['src/index.ts', 'src/client.ts'],
  format: ['esm'],
  dts: true,
  clean: true,
  external: ['markdown-it'],
  onSuccess: async () => {
    copyFileSync('src/style.css', 'dist/style.css')
  },
})
