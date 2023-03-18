console.log('background script loaded');

// Options for the observer (which mutations to observe)
const config: MutationObserverInit = {
  attributes: true,
  childList: true,
  subtree: true,
};

const documentBodyObserver = new MutationObserver((mutations) => {
  const nodeList = mutations
    .filter((mutation) => mutation.addedNodes.length > 0)
    .map((mutation) => mutation.addedNodes);

  for (const nodeListValues of nodeList.values()) {
    for (const nodeListValues1 of nodeListValues.values()) {
      if (nodeListValues1.nodeName === 'PORTAL-APPLICATION') {
        console.log({ cc: nodeListValues1.nodeType === Node.ELEMENT_NODE });
        if (nodeListValues1 instanceof HTMLElement) {
          console.log({ ins: nodeListValues1 });

          nodeListValues1.click();
        }
      }
    }
  }
});

documentBodyObserver.observe(document.body, config);

export {};
