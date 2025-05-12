import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/ask': 'https://backend-tradeconnect-production.up.railway.app',
      '/test': 'https://backend-tradeconnect-production.up.railway.app'
    }
  }
})