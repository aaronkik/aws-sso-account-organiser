import { vi, describe, expect, test } from 'vitest';
import { ChromeStorageSync } from '~/repositories';
import { accountFilterStatus } from './account-filter-status';

const spyOnChromeStorageSyncGet = () => vi.spyOn(ChromeStorageSync.prototype, 'get');
const spyOnChromeStorageSyncSet = () => vi.spyOn(ChromeStorageSync.prototype, 'set');

describe('accountFilterStatus', () => {
  test(`GIVEN a query to get accountFilterStatus
        THEN expect the key accountFilterStatus to be used to access the storage item`, async () => {
    const chromeStorageSyncGetSpy = spyOnChromeStorageSyncGet();

    expect(chromeStorageSyncGetSpy).toBeCalledTimes(0);
    await accountFilterStatus.get();
    expect(chromeStorageSyncGetSpy).toBeCalledTimes(1);
    expect(chromeStorageSyncGetSpy).toBeCalledWith('accountFilterStatus');
  });

  test(`GIVEN accountFilterStatus is enabled
        THEN expect the key accountFilterStatus to be used to set the value in chrome storage with a value of true`, async () => {
    const chromeStorageSyncSetSpy = spyOnChromeStorageSyncSet();

    expect(chromeStorageSyncSetSpy).toBeCalledTimes(0);
    await accountFilterStatus.enable();
    expect(chromeStorageSyncSetSpy).toBeCalledTimes(1);
    expect(chromeStorageSyncSetSpy).toBeCalledWith({ accountFilterStatus: true });
  });

  test(`GIVEN accountFilterStatus is disabled
        THEN expect the key accountFilterStatus to be used to set the value in chrome storage with a value of false`, async () => {
    const chromeStorageSyncSetSpy = spyOnChromeStorageSyncSet();

    expect(chromeStorageSyncSetSpy).toBeCalledTimes(0);
    await accountFilterStatus.disable();
    expect(chromeStorageSyncSetSpy).toBeCalledTimes(1);
    expect(chromeStorageSyncSetSpy).toBeCalledWith({ accountFilterStatus: false });
  });

  test(`GIVEN a query to get accountFilterStatus
        WHEN chrome storage is empty
        THEN expect get to resolve to true`, async () => {
    spyOnChromeStorageSyncGet().mockResolvedValueOnce({});

    await expect(accountFilterStatus.get()).resolves.toBe(true);
  });

  test(`GIVEN accountFilterStatus is disabled after being enabled
        THEN expect get to resolve to false`, async () => {
    await expect(accountFilterStatus.get()).resolves.toBe(true);
    await accountFilterStatus.disable();
    await expect(accountFilterStatus.get()).resolves.toBe(false);
  });

  test(`GIVEN a query to get accountFilterStatus
        WHEN chrome storage throws an error
        THEN expect get to reject with the error`, async () => {
    spyOnChromeStorageSyncGet().mockRejectedValueOnce(new Error('test error'));
    await expect(accountFilterStatus.get()).rejects.toThrowError('test error');
  });

  test(`GIVEN a query to get accountFilterStatus
        WHEN chrome storage returns an empty object
        THEN expect get to resolve to true`, async () => {
    spyOnChromeStorageSyncGet().mockResolvedValueOnce({});
    await expect(accountFilterStatus.get()).resolves.toBe(true);
  });

  test(`GIVEN a query to get accountFilterStatus
        WHEN chrome storage returns an object with a key that is not accountFilterStatus
        THEN expect get to resolve to true`, async () => {
    spyOnChromeStorageSyncGet().mockResolvedValueOnce({ test: true });
    await expect(accountFilterStatus.get()).resolves.toBe(true);
  });

  test(`GIVEN a query to get accountFilterStatus
        WHEN chrome storage returns undefined
        THEN expect get to resolve to true`, async () => {
    spyOnChromeStorageSyncGet().mockResolvedValueOnce(undefined);
    await expect(accountFilterStatus.get()).resolves.toBe(true);
  });

  test(`GIVEN a query to get accountFilterStatus
        WHEN chrome storage returns an object with a key that is accountFilterStatus
        AND the value is not a boolean
        THEN expect get to resolve to true`, async () => {
    const chromeStorageSyncGetSpy = spyOnChromeStorageSyncGet();
    chromeStorageSyncGetSpy.mockResolvedValueOnce({ accountFilterStatus: 'test' });
    await expect(accountFilterStatus.get()).resolves.toBe(true);
  });
});
