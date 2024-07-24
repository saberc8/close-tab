document.getElementById('closeTabsButton').addEventListener('click', function () {
  chrome.runtime.sendMessage({ action: 'closeTabs' });
});