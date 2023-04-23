import { ChromeStorageSync } from '~/repositories';

const accountFiltersStorageKey = 'accountFilters';

type AccountFilter = {
  id: string;
  filter: string;
};

type GetAccountFilterStorage = {
  [accountFiltersStorageKey]?: Array<AccountFilter>;
};

export class AccountFilterStorage {
  #storageKey = accountFiltersStorageKey;
  #storage = new ChromeStorageSync();

  async get() {
    return this.#storage.get<GetAccountFilterStorage>(this.#storageKey);
  }

  async set(accountFilters: Array<AccountFilter>) {
    return this.#storage.set({ accountFilters });
  }

  async add(accountFilterName: AccountFilter['filter']) {
    const newAccountFilter: AccountFilter = {
      id: crypto.randomUUID(),
      filter: accountFilterName.trim(),
    };

    const accountFilterStorageResult = await this.get();

    if (
      !accountFilterStorageResult ||
      !('accountFilters' in accountFilterStorageResult) ||
      !Array.isArray(accountFilterStorageResult.accountFilters) ||
      accountFilterStorageResult.accountFilters.length === 0
    ) {
      return this.set([newAccountFilter]);
    }

    const filteredDuplicateAccountFilters = accountFilterStorageResult.accountFilters.filter(
      ({ filter }) => filter !== newAccountFilter.filter
    );

    return this.set([newAccountFilter, ...filteredDuplicateAccountFilters]);
  }
}
