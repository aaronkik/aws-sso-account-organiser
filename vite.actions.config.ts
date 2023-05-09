import react from '@vitejs/plugin-react';
import copy from 'rollup-plugin-copy';
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
    copyPublicDir: false,
    rollupOptions: {
      plugins: [
        copy({
          targets: [{ src: resolve(__dirname, 'public/*'), dest: resolve(__dirname, 'dist') }],
        }),
        react(),
      ],
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
