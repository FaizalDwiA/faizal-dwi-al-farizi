import { defineConfig } from 'vite'
import { resolve } from 'path'
import injectHTML from 'vite-plugin-html-inject'

export default defineConfig({
  root: 'web-src',
  base: './',
  plugins: [injectHTML()],
  server: {
    port: 1174
  },
  build: {
    outDir: '../docs',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve('web-src/index.html'),
        projects: resolve('web-src/projects.html'),
        admin: resolve('web-src/admin.html'),
        certificates: resolve('web-src/certificates.html'),
        details: resolve('web-src/project-details.html'),
        projectsAdmin: resolve('web-src/projects-admin.html'),
        detailsAdmin: resolve('web-src/project-details-admin.html')
      }
    }
  }
})
