import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  build: {
    rollupOptions: {
      plugins: [react({ fastRefresh: false })],
      input: {
        index: resolve(__dirname, 'src/index.ts'),
        popup: resolve(__dirname, 'src/popup/index.html'),
      },
      output: {
        entryFileNames: (chunk) => `${chunk.name}.js`,
      },
    },
    sourcemap: !isProduction,
  },
});
