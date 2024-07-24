document.getElementById('closeTabsButton').addEventListener('click', function () {
  chrome.runtime.sendMessage({ action: 'closeTabs' });
});

document.addEventListener('DOMContentLoaded', function () {
  const domainsTextarea = document.getElementById('domains');
  const saveButton = document.getElementById('saveDomainsButton');
  const closeButton = document.getElementById('closeTabsButton');

  // Load saved domains
  chrome.storage.local.get(['domains'], function (result) {
    if (result.domains) {
      domainsTextarea.value = result.domains.join(',');
    }
  });

  // Save domains to local storage
  saveButton.addEventListener('click', function () {
    const domains = domainsTextarea.value.split(',').map(domain => domain.trim());
    chrome.storage.local.set({ domains: domains }, function () {
      console.log('Domains saved:', domains);
    });
  });

  // Send message to background script to close tabs
  closeButton.addEventListener('click', function () {
    chrome.runtime.sendMessage({ action: 'closeTabs' }, function (response) {
      console.log(response.result);
    });
  });
});