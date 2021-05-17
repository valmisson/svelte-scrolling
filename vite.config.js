import { resolve } from 'path'
import { defineConfig } from 'vite'
import svelte from '@svitejs/vite-plugin-svelte'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SmartScroll'
    }
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './'),
      '@src': resolve(__dirname, 'src'),
      '@actions': resolve(__dirname, 'src/actions'),
      '@helpers': resolve(__dirname, 'src/helpers/index.ts')
    }
  },
  plugins: [
    svelte()
  ]
})
