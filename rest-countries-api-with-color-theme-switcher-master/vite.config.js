// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.NODE_ENV === 'production'
    ? '/frontendmentor/rest-countries-api-with-color-theme-switcher-master-deploy/'
    : '/',
})
