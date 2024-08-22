// https://vitejs.dev/config/
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
    // '/upload': "http://localhost:5000"
    '/upload': "https://image-uploader-backend-48ij.onrender.com"
    },
    base: '/image-uploader/',
    build: {
      outDir: 'dist',
   },
  },
});