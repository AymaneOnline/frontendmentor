import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/frontendmentor/space-tourism-website-main-deploy/', // 👈 REQUIRED for GitHub Pages
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        destination: resolve(__dirname, 'destination.html'),
        crew: resolve(__dirname, 'crew.html'),
        technology: resolve(__dirname, 'technology.html'),
      }
    }
  }
})
