import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // React plugin
    eslintPlugin({
      // ESLint plugin with options
      cache: false, // Disable ESLint cache
      include: ['src/**/*.js', 'src/**/*.jsx', 'src/**/*.ts', 'src/**/*.tsx'], // Specify files to lint
    }),
  ],
  build: {
    outDir: '../api/public', // Specify output directory for build
    emptyOutDir: true, // Clear outDir before build
  },
});
