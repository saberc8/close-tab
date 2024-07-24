chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'closeTabs') {
    chrome.storage.local.get(['domains'], function (result) {
      const domains = result.domains || [];
      chrome.tabs.query({}, function (tabs) {
        for (let i = 0; i < tabs.length; i++) {
          const tab = tabs[i];
          for (let domain of domains) {
            if (tab.url.includes(domain.trim())) {
              chrome.tabs.remove(tab.id);
              break;
            }
          }
        }
      });
    });
    sendResponse({ result: 'success' });
  }
});
