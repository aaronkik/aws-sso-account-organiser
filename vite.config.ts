import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const srcDir = resolve(__dirname, 'src');

export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [react({ fastRefresh: false })],
      input: {
        index: resolve(srcDir, 'index.ts'),
        popup: resolve(srcDir, 'popup/index.html'),
      },
      output: {
        entryFileNames: (chunk) => `${chunk.name}.js`,
      },
    },
  },
});
