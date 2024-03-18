import { accountFilterStatus } from '~/services/account-filter-status';
import { accountFilterStorage } from '~/services/account-filter-storage';
// import type {
//   AccountFilterChromeStorageChange,
//   AccountFilterStatusChromeStorageChange,
// } from '~/types';

const documentBodyObserver = new MutationObserver(async (mutationRecord) => {
  const accountFilterStatusIsEnabled = await accountFilterStatus.get();
  if (!accountFilterStatusIsEnabled) return;

  for (const { addedNodes } of mutationRecord) {
    for (const addedNode of addedNodes.values()) {
      if (!(addedNode instanceof HTMLElement)) continue;

      const accountListElement = addedNode.querySelector('[data-testid="account-list"]');

      if (!accountListElement) continue;

      let userStorageAccountFilters: Awaited<ReturnType<(typeof accountFilterStorage)['get']>>;

      try {
        userStorageAccountFilters = await accountFilterStorage.get();
      } catch (error) {
        console.error('Error accessing storage for key accountFilters', error);
        continue;
      }

      if (!userStorageAccountFilters) continue;
      if (!('accountFilters' in userStorageAccountFilters)) continue;
      if (!Array.isArray(userStorageAccountFilters?.accountFilters)) continue;
      if (!userStorageAccountFilters.accountFilters.length) continue;

      const { accountFilters } = userStorageAccountFilters;

      let accountFilterRegExes: Array<RegExp>;

      try {
        accountFilterRegExes = accountFilters
          .filter(({ enabled }) => enabled === true)
          .map(({ filter }) => new RegExp(filter, 'iu'));
      } catch (error) {
        console.error('Error creating RegExp from accountFilters', error);
        continue;
      }

      const accountNameMatchesAccountFilterRegExes = (awsAccountName: string) =>
        accountFilterRegExes.some((accountFilterRegEx) => accountFilterRegEx.test(awsAccountName));

      const accountListItems = addedNode.querySelectorAll('[data-testid="account-list"] > div');
      const filteredAwsAccountElements = Array.from(accountListItems).filter((listItem) => {
        const awsAccountName = listItem.querySelector('strong')?.textContent;
        if (!awsAccountName) return false;
        return accountNameMatchesAccountFilterRegExes(awsAccountName);
      });

      accountListElement.replaceChildren(...filteredAwsAccountElements);
    }
  }
});

documentBodyObserver.observe(document.body, { childList: true, subtree: true });

// TODO: Can I make this work?
// const onChange = async (
//   changes:
//     | chrome.storage.StorageChange
//     | AccountFilterChromeStorageChange
//     | AccountFilterStatusChromeStorageChange,
// ) => {
//   if (!('accountFilterStatus' in changes || 'accountFilters' in changes)) return;
//   const isFilterEnabled = await accountFilterStatus.get();
//
//   if (!isFilterEnabled && 'accountFilters' in changes) return;
//
// };
//
// chrome.storage.onChanged.addListener(onChange);
