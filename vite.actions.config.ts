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
      plugins: [react({ fastRefresh: false })],
      input: {
        popup: resolve(srcDir, 'popup/index.html'),
      },
      output: {
        dir: resolve(__dirname, 'dist/actions'),
        entryFileNames: (chunk) => `${chunk.name}.js`,
      },
    },
  },
});
