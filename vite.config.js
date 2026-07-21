import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // forward API calls to the contact server during `npm run dev`
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
  build: {
    target: 'es2020',
    // Split rarely-changing vendor code into its own chunks so the browser
    // can cache React / Framer Motion across deploys.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
})
