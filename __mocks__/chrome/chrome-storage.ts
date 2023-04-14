/**
 * Implementation of the chrome.storage API for use in tests.
 * chrome is not to be confused with the browser Chrome.
 *
 * @see https://developer.chrome.com/docs/extensions/reference/storage/
 * @see https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage
 */

export class ChromeStorageArea {
  #storage: Record<string, unknown>;

  constructor(initialStorage: Record<string, unknown> = {}) {
    this.#storage = initialStorage;
  }

  get(keys: string | string[] | Record<string, unknown> | null) {
    if (keys === null) {
      return Promise.resolve(this.#storage);
    }

    if (typeof keys === 'string') {
      return Promise.resolve({ [keys]: this.#storage[keys] });
    }

    if (Array.isArray(keys)) {
      return Promise.resolve(
        keys.reduce((acc, key) => {
          acc[key] = this.#storage[key];
          return acc;
        }, {} as Record<string, unknown>)
      );
    }

    return Promise.resolve(
      Object.keys(keys).reduce((acc, key) => {
        acc[key] = this.#storage[key];
        return acc;
      }, {} as Record<string, unknown>)
    );
  }

  set(items: Record<string, unknown>) {
    Object.assign(this.#storage, items);
    return Promise.resolve();
  }

  remove(keys: string | string[]) {
    if (typeof keys === 'string') {
      delete this.#storage[keys];
    } else {
      keys.forEach((key) => delete this.#storage[key]);
    }
    return Promise.resolve();
  }

  clear() {
    this.#storage = {};
    return Promise.resolve();
  }
}
