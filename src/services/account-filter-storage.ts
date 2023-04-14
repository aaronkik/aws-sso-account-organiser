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
}
