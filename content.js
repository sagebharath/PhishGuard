function showResult(label, score) {
  let color = "#27ae60";
  let text = "SAFE WEBSITE";

  if (label === "SUSPICIOUS") {
    color = "#f39c12";
    text = "POTENTIALLY SUSPICIOUS";
  }

  if (label === "PHISHING") {
    color = "#e74c3c";
    text = "PHISHING WEBSITE";
  }

  const old = document.getElementById("phishguard-box");
  if (old) old.remove();

  const box = document.createElement("div");
  box.id = "phishguard-box";

  box.innerHTML =
    "<b>PhishGuard</b><br>" + text + "<br>Risk Score: " + score + "/100";

  box.style.position = "fixed";
  box.style.top = "20px";
  box.style.right = "20px";
  box.style.background = color;
  box.style.color = "white";
  box.style.padding = "12px 16px";
  box.style.borderRadius = "8px";
  box.style.fontSize = "14px";
  box.style.fontFamily = "Arial";
  box.style.zIndex = "999999";
  box.style.boxShadow = "0 2px 10px rgba(0,0,0,0.4)";

  document.body.appendChild(box);

  setTimeout(() => {
    box.remove();
  }, 4000);
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "SHOW_RESULT") {
    showResult(msg.label, msg.score);
  }
});
