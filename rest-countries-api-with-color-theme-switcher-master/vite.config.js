import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/AymaneOnline.github.io/frontendmentor/rest-countries-api-with-color-theme-switcher-master/', // GitHub Pages path
})
