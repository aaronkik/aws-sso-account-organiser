import { defineConfig } from 'vite';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: 'src/index.ts',
      },
      output: {
        entryFileNames: (chunk) => `${chunk.name}.js`,
      },
    },
    sourcemap: !isProduction,
  },
});
