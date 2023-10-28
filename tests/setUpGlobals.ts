import { randomUUID } from 'node:crypto';
import { vi } from 'vitest';
import { chrome } from '../__mocks__/chrome';

vi.stubGlobal('chrome', chrome);

globalThis.window.crypto.randomUUID = randomUUID;
