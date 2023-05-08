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
      input: resolve(srcDir, 'background/index.ts'),
      output: {
        dir: resolve(__dirname, 'dist/background'),
        entryFileNames: (chunk) => `${chunk.name}.js`,
        inlineDynamicImports: true,
      },
    },
  },
});
