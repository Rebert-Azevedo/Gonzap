document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  chrome.runtime.sendMessage({ action: "login" }, (response) => {
    console.log(response.status);
  });
});