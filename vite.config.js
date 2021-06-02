import { resolve } from 'path'
import { defineConfig } from 'vite'
import svelte from '@svitejs/vite-plugin-svelte'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Scrolling'
    }
  },
  plugins: [
    svelte()
  ]
})
