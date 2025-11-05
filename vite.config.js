import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist', // Vercel looks for /dist by default
  },
  base: '/', // 🔥 This ensures correct path resolution on Vercel
});
