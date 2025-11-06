



import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Vite config
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})

