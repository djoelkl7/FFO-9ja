import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  // Use '/FFO-9ja/' for GitHub Pages repository builds, or VITE_BASE_URL override for cPanel
  const base = process.env.VITE_BASE_URL || (command === 'build' ? '/FFO-9ja/' : '/');

  return {
    plugins: [react(), tailwindcss()],
    base,
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true,
    },
    preview: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true,
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            gsap: ['gsap'],
            icons: ['lucide-react'],
          },
        },
      },
    },
  };
});
