import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Yeh config Github Pages ke liye best hai.
// Apni repo ka EXACT naam 'base' me likhna hai.
// Example: base: '/CallHub-Website/' (case sensitive, repo ke URL se match karna)

export default defineConfig({
  base: '/CallHub-Website/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    host: '::',
    port: 3000,
  },
});
