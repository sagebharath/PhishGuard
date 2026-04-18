chrome.storage.local.get("lastScan", (data) => {
  const result = document.getElementById("result");

  if (!data.lastScan) {
    result.innerText = "No scan yet";
    return;
  }

  const label = data.lastScan.label;

  if (label === "PHISHING") result.innerText = "🔴 PHISHING SITE";
  else if (label === "SUSPICIOUS") result.innerText = "🟡 Suspicious";
  else result.innerText = "🟢 Safe";
});
