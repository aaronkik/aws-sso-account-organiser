import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { chrome } from '../__mocks__/chrome';

expect.extend(matchers);

afterEach(() => {
  chrome.storage.sync.clear();
  cleanup();
});
