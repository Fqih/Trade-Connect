import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Trade-Connect/',
  server: {
    proxy: {
      '/ask': {
        target: 'https://backend-tradeconnect-production.up.railway.app',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/ask/, '/ask')
      },
      '/test': {
        target: 'https://backend-tradeconnect-production.up.railway.app',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/test/, '/test')
      }
    }
  }
})