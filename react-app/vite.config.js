import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/api': {
        target: "http://3.104.43.156:8080", // Backend server URL
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''), // Optional: rewrite the path if needed
      },
    },
  },
})
