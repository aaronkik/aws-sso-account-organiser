import { type AccountFilter } from '~/services/account-filter-storage';

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
