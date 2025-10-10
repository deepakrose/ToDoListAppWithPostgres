import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/ToDoListAppWithPostgres/', // ✅ must match GitHub repo name
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
})
