chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.create({ url: "dashboard/dashboard.html" });
});