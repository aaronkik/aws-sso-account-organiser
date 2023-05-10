import { type AccountFilter } from '~/services/account-filter-storage';
import { accountFilterStatus } from '~/services/account-filter-status';

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

export type AccountFilterStatusChromeStorageChange = Record<
  'accountFilterStatus',
  GenericChromeStorageChange<Awaited<ReturnType<typeof accountFilterStatus.get>>>
>;
