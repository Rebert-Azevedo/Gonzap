chrome.runtime.onInstalled.addListener(() => {
  console.log("Gonzap extension installed");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "login") {
    // Handle login
  } else if (request.action === "register") {
    // Handle register
  }
  sendResponse({ status: "success" });
});