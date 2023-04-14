import { describe, expect, vi, beforeEach, afterEach, test } from 'vitest';
import { AccountFilterStorage } from './account-filter-storage';
import { chrome } from '../../__mocks__/chrome';

describe('AccountFilterStorage', () => {
  beforeEach(() => {
    vi.stubGlobal('chrome', chrome);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test(`GIVEN a query to get accountFilters
        WHEN chrome storage is empty
        THEN expect an empty object to be returned`, async () => {
    const accountFilterStorage = new AccountFilterStorage();
    await expect(accountFilterStorage.get()).resolves.toEqual({});
  });

  test(`GIVEN a query to get accountFilters
        WHEN accountFilters are set
        THEN expect an array of the set accountFilters to be returned`, async () => {
    const accountFilterStorage = new AccountFilterStorage();

    const accountFilters = [
      { id: '1', filter: 'foo' },
      { id: '2', filter: 'bar' },
      { id: '3', filter: 'baz' },
    ];

    await accountFilterStorage.set(accountFilters);
    await expect(accountFilterStorage.get()).resolves.toEqual({ accountFilters });
  });

  test(`GIVEN accountFilters are set
        AND a query to get accountFilters is made
        AND accountFilters are overwritten
        THEN expect an array of the updated accountFilters to be returned`, async () => {
    const accountFilterStorage = new AccountFilterStorage();

    const accountFilters = [
      { id: '1', filter: 'foo' },
      { id: '2', filter: 'bar' },
      { id: '3', filter: 'baz' },
    ];

    await accountFilterStorage.set(accountFilters);
    await expect(accountFilterStorage.get()).resolves.toEqual({ accountFilters });

    const updatedAccountFilters = [
      { id: '1', filter: 'foo' },
      { id: '2', filter: 'bar' },
      { id: '3', filter: 'baz' },
      { id: '4', filter: 'qux' },
    ];

    await accountFilterStorage.set(updatedAccountFilters);
    await expect(accountFilterStorage.get()).resolves.toEqual({
      accountFilters: updatedAccountFilters,
    });
  });
});
