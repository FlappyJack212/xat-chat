import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src/client',
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'http://localhost:8000',
        ws: true,
      }
    }
  },
  build: {
    outDir: '../../dist-client',
    emptyOutDir: true
  }
});
