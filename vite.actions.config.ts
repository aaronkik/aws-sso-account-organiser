import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const srcDir = resolve(__dirname, 'src');

export default defineConfig({
  resolve: {
    alias: {
      '~': srcDir,
    },
  },
  build: {
    rollupOptions: {
      plugins: [react()],
      input: {
        popup: resolve(srcDir, 'popup/index.html'),
      },
    },
  },
});
