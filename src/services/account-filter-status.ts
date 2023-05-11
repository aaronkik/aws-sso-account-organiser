import { ChromeStorageSync } from '~/repositories';

const accountFiltersStatusKey = 'accountFilterStatus';

type GetAccountFilterStatus = {
  [accountFiltersStatusKey]?: boolean;
};

class AccountFilterStatus {
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
          if (
            result &&
            'accountFilterStatus' in result &&
            typeof result.accountFilterStatus === 'boolean'
          ) {
            resolve(result.accountFilterStatus);
          } else {
            this.enable();
            resolve(true);
          }
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

export const accountFilterStatus = new AccountFilterStatus();
