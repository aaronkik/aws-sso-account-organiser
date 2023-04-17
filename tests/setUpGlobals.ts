import { randomUUID } from 'node:crypto';
import { vi } from 'vitest';
import { chrome } from '../__mocks__/chrome';

vi.stubGlobal('chrome', chrome);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
globalThis.window.crypto.randomUUID = randomUUID;
