// Vite Configuration for Weather Frontend
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: '**/*.jsx',
    })
  ],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    },
    // Disable all caching
    hmr: {
      overlay: true
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  // Disable all caching
  build: {
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  // Disable dependencies cache
  optimizeDeps: {
    force: true,
    exclude: []
  },
  // HTML file configuration
  appType: 'spa'
});
