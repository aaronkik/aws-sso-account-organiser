import { GetAccountFilterChromeStorage } from '~/types/chrome';

const documentBodyObserver = new MutationObserver(async (mutationRecord) => {
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

      let userStorageAccountFilters: GetAccountFilterChromeStorage | null | undefined;

      try {
        userStorageAccountFilters = await chrome.storage.sync.get('accountFilters');
      } catch (error) {
        console.error('Error accessing storage for key accountFilters', error);
        continue;
      }

      if (!userStorageAccountFilters) continue;
      if (!('accountFilters' in userStorageAccountFilters)) continue;
      if (!Array.isArray(userStorageAccountFilters?.accountFilters)) continue;
      if (!userStorageAccountFilters.accountFilters.length) continue;

      const { accountFilters } = userStorageAccountFilters;

      const portalInstances = addedNode.querySelectorAll('portal-instance-list > div');

      const filteredAwsAccountNodes = Array.from(portalInstances).filter((instance) => {
        const awsAccountName = instance.querySelector('.name')?.textContent;

        const filteredNode = accountFilters.find(({ filter }) =>
          awsAccountName?.trim().toLowerCase().includes(filter.trim().toLowerCase())
        );

        return filteredNode;
      });

      portalInstanceList.replaceChildren(...filteredAwsAccountNodes);
    }
  }
});

documentBodyObserver.observe(document.body, { childList: true, subtree: true });
