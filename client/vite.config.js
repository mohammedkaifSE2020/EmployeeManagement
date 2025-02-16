import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// Load environment variables from `.env`
dotenv.config()

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: "https://employee-management-murex-xi.vercel.app/", // Use process.env instead of import.meta.env
        changeOrigin: true,
        secure: false,
      }
    }
  },
  plugins: [react()],
})
