import { accountFilterStatus } from '~/services/account-filter-status';
import { accountFilterStorage } from '~/services/account-filter-storage';
import type {
  AccountFilterChromeStorageChange,
  AccountFilterStatusChromeStorageChange,
} from '~/types';

const documentBodyObserver = new MutationObserver(async (mutationRecord) => {
  const accountFilterStatusIsEnabled = await accountFilterStatus.get();
  if (!accountFilterStatusIsEnabled) return;

  for (const { addedNodes } of mutationRecord) {
    for (const addedNode of addedNodes.values()) {
      const { nodeName } = addedNode;
      const isAwsAccountPortalApp =
        nodeName === 'PORTAL-APPLICATION' &&
        addedNode instanceof HTMLElement &&
        addedNode.getAttribute('title') === 'AWS Account';

      if (isAwsAccountPortalApp) {
        addedNode.click();
        continue;
      }

      const isSsoExpander = nodeName === 'SSO-EXPANDER' && addedNode instanceof HTMLElement;

      if (!isSsoExpander) continue;

      const portalInstanceList = addedNode.querySelector('portal-instance-list');

      if (!portalInstanceList) continue;

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

      const portalInstances = addedNode.querySelectorAll('portal-instance-list > div');
      const filteredAwsAccountNodes = Array.from(portalInstances).filter((instance) => {
        const awsAccountName = instance.querySelector('.name')?.textContent;
        if (!awsAccountName) return false;
        return accountNameMatchesAccountFilterRegExes(awsAccountName);
      });

      portalInstanceList.replaceChildren(...filteredAwsAccountNodes);
    }
  }
});

documentBodyObserver.observe(document.body, { childList: true, subtree: true });

const onChange = async (
  changes:
    | chrome.storage.StorageChange
    | AccountFilterChromeStorageChange
    | AccountFilterStatusChromeStorageChange,
) => {
  if (!('accountFilterStatus' in changes || 'accountFilters' in changes)) return;
  const isFilterEnabled = await accountFilterStatus.get();

  if (!isFilterEnabled && 'accountFilters' in changes) return;

  const awsPortalAppSelected = document.querySelector(
    'portal-application[title="AWS Account"].selected',
  );

  if (awsPortalAppSelected instanceof HTMLElement) {
    /** dblClick event doesn't work 🤔 */
    const clickEvent = new MouseEvent('click');
    awsPortalAppSelected.dispatchEvent(clickEvent);
    awsPortalAppSelected.dispatchEvent(clickEvent);
  }
};

chrome.storage.onChanged.addListener(onChange);
