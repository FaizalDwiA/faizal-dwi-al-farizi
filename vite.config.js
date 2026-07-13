import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  root: 'web-src',
  base: './',
  plugins: [react()],
  server: {
    port: 1174
  },
  build: {
    outDir: '../docs',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve('web-src/index.html')
      }
    }
  }
})
