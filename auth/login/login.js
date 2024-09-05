document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  chrome.runtime.sendMessage({ action: "getData" }, (response) => {
    console.log(response.data);
  });
});
