import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/frontendmentor/multi-step-form/',
  build: {
    assetsInlineLimit: 0, // Don't inline any assets, keep them as separate files
  },
})
