import { describe, expect, vi, beforeEach, afterEach, test } from 'vitest';
import { ChromeStorageSync } from './chrome-storage-sync';
import { chrome } from '../../__mocks__/chrome';

describe('ChromeStorageSync', () => {
  beforeEach(() => {
    vi.stubGlobal('chrome', chrome);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test(`GIVEN a query to get all storage items
        WHEN chrome storage is empty
        THEN expect an empty object to be returned`, async () => {
    const chromeStorageSync = new ChromeStorageSync();
    await expect(chromeStorageSync.get(null)).resolves.toEqual({});
  });

  test(`GIVEN a query to get all storage items
        WHEN multiple storage items are set
        THEN expect an object with the set storage items to be returned`, async () => {
    const chromeStorageSync = new ChromeStorageSync();

    const storageItems = {
      foo: 'bar',
      bar: 'foo',
      baz: 'bar',
    };

    await chromeStorageSync.set(storageItems);
    await expect(chromeStorageSync.get(null)).resolves.toEqual(storageItems);
  });

  test(`GIVEN a query to get a specific storage item by key 'foo'
        WHEN multiple storage items are set
        THEN expect the storage item 'foo' to be returned`, async () => {
    const chromeStorageSync = new ChromeStorageSync();

    const storageItems = {
      foo: 'bar',
      bar: 'foo',
      baz: 'bar',
    };

    await chromeStorageSync.set(storageItems);
    await expect(chromeStorageSync.get('foo')).resolves.toEqual({ foo: 'bar' });
  });

  test(`GIVEN a query to get multiple storage items (foo, bar)
        WHEN multiple storage items are set
        THEN expect the storage items (foo, bar) to be returned`, async () => {
    const chromeStorageSync = new ChromeStorageSync();

    const storageItems = {
      foo: 'bar',
      bar: 'foo',
      baz: 'bar',
    };

    await chromeStorageSync.set(storageItems);
    await expect(chromeStorageSync.get(['foo', 'bar'])).resolves.toEqual({
      foo: 'bar',
      bar: 'foo',
    });
  });
});
