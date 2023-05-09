import { accountFilterStatus } from '~/services/account-filter-status';
import { accountFilterStorage } from '~/services/account-filter-storage';

const documentBodyObserver = new MutationObserver(async (mutationRecord) => {
  const accountFilterStatusisEnabled = await accountFilterStatus.get();
  if (!accountFilterStatusisEnabled) return;

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
        accountFilterRegExes = accountFilters.map(({ filter }) => new RegExp(filter, 'iu'));
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
