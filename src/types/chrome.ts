import { type AccountFilter } from './account-filter';

interface GenericChromeStorageChange<Type> extends chrome.storage.StorageChange {
  newValue?: Type;
  oldValue?: Type;
}

export type AccountFilterChromeStorageChange = Record<
  'accountFilters',
  GenericChromeStorageChange<Array<AccountFilter>>
>;

export type GetAccountFilterChromeStorage = {
  accountFilters?: Array<AccountFilter>;
};
