import { ChromeStorageSync } from '~/repositories';

const ACCOUNT_FILTER_STORAGE_KEY = 'accountFilters';

export type AccountFilter = {
  enabled: boolean;
  filter: string;
  id: string;
};

type GetAccountFilterStorage = {
  [ACCOUNT_FILTER_STORAGE_KEY]: Array<AccountFilter>;
};

class AccountFilterStorage {
  #storageKey = ACCOUNT_FILTER_STORAGE_KEY;
  #storage = new ChromeStorageSync();

  #updateFilterStatusById = async ({
    accountFilterId,
    enabled,
  }: {
    accountFilterId: AccountFilter['id'];
    enabled: boolean;
  }) => {
    const { accountFilters } = await this.get();

    if (accountFilters.length === 0) return;

    const updatedAccountFilters = accountFilters.map((accountFilter) =>
      accountFilter.id === accountFilterId ? { ...accountFilter, enabled } : accountFilter,
    );

    return this.set(updatedAccountFilters);
  };

  async get(): Promise<GetAccountFilterStorage> {
    const accountFilterStorageResult = await this.#storage.get<GetAccountFilterStorage>(
      this.#storageKey,
    );

    if (
      accountFilterStorageResult &&
      'accountFilters' in accountFilterStorageResult &&
      Array.isArray(accountFilterStorageResult.accountFilters)
    ) {
      return accountFilterStorageResult;
    }

    await this.set([]);
    return { accountFilters: [] };
  }

  async set(accountFilters: Array<AccountFilter>) {
    return this.#storage.set({ accountFilters });
  }

  async add(accountFilterName: AccountFilter['filter']) {
    const newAccountFilter: AccountFilter = {
      enabled: true,
      filter: accountFilterName.trim(),
      id: crypto.randomUUID(),
    };

    const { accountFilters } = await this.get();

    if (accountFilters.length === 0) {
      return this.set([newAccountFilter]);
    }

    const filteredDuplicateAccountFilters = accountFilters.filter(
      ({ filter }) => filter !== newAccountFilter.filter,
    );

    return this.set([newAccountFilter, ...filteredDuplicateAccountFilters]);
  }

  async disable({ accountFilterId }: { accountFilterId: AccountFilter['id'] }) {
    return this.#updateFilterStatusById({ accountFilterId, enabled: false });
  }

  async enable({ accountFilterId }: { accountFilterId: AccountFilter['id'] }) {
    return this.#updateFilterStatusById({ accountFilterId, enabled: true });
  }
}

export const accountFilterStorage = new AccountFilterStorage();
