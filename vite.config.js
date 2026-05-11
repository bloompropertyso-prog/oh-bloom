import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // jsPDF optionally imports canvg for SVG support — we don't use it
      canvg: fileURLToPath(new URL('./src/stubs/canvg-stub.js', import.meta.url)),
    },
  },
})
