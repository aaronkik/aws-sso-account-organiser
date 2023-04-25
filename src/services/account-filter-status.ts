import { ChromeStorageSync } from '~/repositories';

const accountFiltersStatusKey = 'accountFilterStatus';

type GetAccountFilterStatus = {
  [accountFiltersStatusKey]?: boolean;
};

export class AccountFilterStatus {
  #storageKey = accountFiltersStatusKey;
  #storage = new ChromeStorageSync();

  async #set(status: boolean) {
    return this.#storage.set({ accountFilterStatus: status });
  }

  async get() {
    return new Promise<boolean>((resolve, reject) => {
      this.#storage
        .get<GetAccountFilterStatus>(this.#storageKey)
        .then((result) => {
          if (!result) return resolve(false);
          if (!('accountFilterStatus' in result)) return resolve(false);
          if (typeof result.accountFilterStatus !== 'boolean') return resolve(false);
          resolve(result.accountFilterStatus);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async enable() {
    return this.#set(true);
  }

  async disable() {
    return this.#set(false);
  }
}
