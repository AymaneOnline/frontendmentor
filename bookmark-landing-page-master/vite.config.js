import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  base: '/frontendmentor/bookmark-landing-page-master-deploy/', // 👈 REQUIRED for GitHub Pages
  plugins: [
    tailwindcss(),
  ],
})