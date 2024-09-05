const db = require('./db/db');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getData") {
    db.query('SELECT * FROM users', (error, results) => {
      if (error) throw error;
      sendResponse({ data: results });
    });
  }
  return true;  // Indicate asynchronous response
});
