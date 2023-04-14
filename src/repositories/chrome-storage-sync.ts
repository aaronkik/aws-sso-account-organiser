type GetChromeStorageParams = Parameters<chrome.storage.StorageArea['get']>[0];
type GetChromeStorageReturn<T> = { [K in keyof T]: T[K] } | object | null | undefined;

type SetChromeStorageParams<T> = { [K in keyof T]: T[K] };
type SetChromeStorageReturn = ReturnType<chrome.storage.StorageArea['set']>;

export class ChromeStorageSync {
  #chromeStorageSync = chrome.storage.sync;

  async get<T>(key: GetChromeStorageParams): Promise<GetChromeStorageReturn<T>> {
    return new Promise((resolve, reject) => {
      this.#chromeStorageSync
        .get(key)
        .then((value) => {
          resolve(value);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  async set<T>(items: SetChromeStorageParams<T>): Promise<SetChromeStorageReturn> {
    return new Promise((resolve, reject) => {
      this.#chromeStorageSync
        .set(items)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
