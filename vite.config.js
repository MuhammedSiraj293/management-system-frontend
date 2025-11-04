import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This will run the dev server on port 5173
    // and automatically open it in your browser.
    port: 5173,
    open: true,
  },
});