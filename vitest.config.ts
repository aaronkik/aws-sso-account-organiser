import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
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
