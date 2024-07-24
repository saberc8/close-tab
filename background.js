chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === 'closeTabs') {
    chrome.tabs.query({}, function (tabs) {
      for (let i = 0; i < tabs.length; i++) {
        const tab = tabs[i];
        if (
          tab.url.includes('csdn.net') ||
          tab.url.includes('google.com') ||
          tab.url.includes('baidu.com')
        ) {
          chrome.tabs.remove(tab.id);
        }
      }
    });
    sendResponse({ result: 'success' });
  }
});