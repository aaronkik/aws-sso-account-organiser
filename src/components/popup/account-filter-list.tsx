import { useEffect, useState } from 'react';
import { AccountFilter, AccountFilterChromeStorageChange } from '~/types';
import AccountFilterItem from './account-filter-item';

const AccountFilterList = () => {
  const [accountFilters, setAccountFilters] = useState<Array<AccountFilter>>([]);

  useEffect(() => {
    chrome.storage.sync.get('accountFilters').then((result) => {
      if (!result['accountFilters']) return;
      setAccountFilters(result['accountFilters']);
    });
  }, []);

  useEffect(() => {
    const onChange = (changes: chrome.storage.StorageChange | AccountFilterChromeStorageChange) => {
      if (!('accountFilters' in changes)) return;
      const { accountFilters } = changes;
      if (!accountFilters?.newValue) return;
      setAccountFilters(accountFilters.newValue);
    };

    chrome.storage.onChanged.addListener(onChange);

    return () => {
      chrome.storage.onChanged.removeListener(onChange);
    };
  }, []);

  return (
    <div className='flex flex-col gap-2 py-2 px-4'>
      {accountFilters.length === 0 ? (
        <p className='text-center text-lg font-medium text-neutral-500'>You have no filters</p>
      ) : (
        <>
          <h2 className='text-xs font-semibold tracking-wider text-neutral-500'>
            Filters ({accountFilters.length})
          </h2>
          <div className='flex flex-col divide-y divide-neutral-300'>
            {accountFilters.map((filter) => (
              <AccountFilterItem key={filter.id} filterItem={filter} filterList={accountFilters} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AccountFilterList;
