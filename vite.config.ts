import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  // Determine base path for GitHub Pages, cPanel, or local development:
  // 1. Explicit environment override via VITE_BASE_URL (e.g. './' for cPanel)
  // 2. Automated GitHub Actions repository base (e.g. '/FFO-9ja/')
  // 3. Fallback to '/FFO-9ja/' for build, or '/' for local dev server
  let base = process.env.VITE_BASE_URL;
  if (!base) {
    if (process.env.GITHUB_REPOSITORY) {
      const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
      base = repoName.endsWith('.github.io') ? '/' : `/${repoName}/`;
    } else if (command === 'build') {
      base = '/FFO-9ja/';
    } else {
      base = '/';
    }
  }

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
      emptyOutDir: true,
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
