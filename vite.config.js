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
  resolve: {
    alias: {
      '~': resolve(__dirname, './'),
      '@src': resolve(__dirname, 'src'),
      '@api': resolve(__dirname, 'src/api'),
      '@actions': resolve(__dirname, 'src/actions'),
      '@functions': resolve(__dirname, 'src/functions'),
      '@helpers': resolve(__dirname, 'src/helpers/index.ts')
    }
  },
  plugins: [
    svelte()
  ]
})
