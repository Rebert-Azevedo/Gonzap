document.getElementById('register-form').addEventListener('submit', (e) => {
    e.preventDefault();
    chrome.runtime.sendMessage({ action: "register" }, (response) => {
      console.log(response.status);
    });
});  