import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function noStaleModuleCachePlugin(): Plugin {
  return {
    name: 'no-stale-module-cache',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        delete req.headers['if-none-match'];
        delete req.headers['if-modified-since'];
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        next();
      });
    },
  };
}

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
      base = './';
    } else {
      base = '/';
    }
  }

  return {
    plugins: [noStaleModuleCachePlugin(), react(), tailwindcss()],
    base,
    resolve: {
      alias: {
        react: path.resolve(__dirname, 'node_modules/react'),
        'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      },
      dedupe: [
        'react',
        'react-dom',
        'react-dom/client',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
      ],
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-dom/client',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'gsap',
        'lucide-react',
      ],
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      allowedHosts: true,
      hmr: false,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        Pragma: 'no-cache',
        Expires: '0',
      },
      warmup: {
        clientFiles: [
          './index.html',
          './src/main.tsx',
          './src/App.tsx',
          './src/views/*.tsx',
          './src/components/*.tsx',
        ],
      },
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
