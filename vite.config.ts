/// <reference types="vitest" />

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
        background: resolve(srcDir, 'background/index.ts'),
        popup: resolve(srcDir, 'popup/index.html'),
      },
      output: {
        entryFileNames: (chunk) => `${chunk.name}.js`,
      },
    },
  },
  test: {
    clearMocks: true,
    coverage: {
      exclude: ['**/*.test.{ts,tsx}', '__mocks__/**/*', 'tests/**/*'],
      reporter: ['text', 'html', 'json', 'lcov'],
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setUpGlobals.ts', './tests/setupTestingLibrary.ts'],
  },
});
