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
  server: {
    // CORS beállítása a Vite szerveren
    cors: true,
  },
  build: {
    // Szükség esetén egyéb build beállítások
    outDir: '../api/dist',
  },
});
