// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // When deploying to GitHub Pages, the app will be served from
  // https://<username>.github.io/<repo>/
  // so we set base to "/<repo>/" in production.
  // For a subfolder app under the repo (e.g., /frontendmentor/rest-countries-api-with-color-theme-switcher-master/),
  // the base must include the subpath so assets resolve correctly.
  base:
    process.env.NODE_ENV === 'production'
      ? '/frontendmentor/rest-countries-api-with-color-theme-switcher-master/'
      : '/',
})
