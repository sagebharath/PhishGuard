importScripts(
  "analyzer/urlAnalyzer.js",
  "ml/mlModel.js",
  "ml/fusionEngine.js",
  "reputation/reputation.js",
);

console.log("PhishGuard background started");

const trustedDomains = [
  "google.com",
  "github.com",
  "microsoft.com",
  "amazon.com",
  "wikipedia.org",
  "linkedin.com",
  "apple.com",
  "facebook.com",
  "youtube.com",
  "stackoverflow.com",
  "openai.com",
  "reddit.com",
  "instagram.com",
];

chrome.webNavigation.onCompleted.addListener(async (details) => {
  if (details.frameId !== 0) return;

  const tab = await chrome.tabs.get(details.tabId);
  const url = tab.url;

  if (
    !url ||
    url.startsWith("chrome://") ||
    url.startsWith("devtools://") ||
    url.startsWith("chrome-extension://")
  ) {
    return;
  }

  console.log("Scanning:", url);

  const hostname = new URL(url).hostname;

  // Trusted domains
  for (let domain of trustedDomains) {
    if (hostname.includes(domain)) {
      safeSend(details.tabId, "SAFE", 0);
      return;
    }
  }

  const features = analyzeURL(url);

  console.table(features);

  const urlScore = mlPredict(features);

  const reputationScore = await checkReputation(url);

  const finalScore = fusionEngine(urlScore, reputationScore);

  const label = classifyRisk(finalScore);

  console.log("Score:", finalScore);
  console.log("Risk:", label);

  chrome.storage.local.set({
    lastScan: {
      url: url,
      score: finalScore,
      label: label,
    },
  });

  safeSend(details.tabId, label, finalScore);
});

function safeSend(tabId, label, score) {
  try {
    chrome.tabs.sendMessage(
      tabId,
      {
        type: "SHOW_RESULT",
        label: label,
        score: score,
      },
      () => {
        if (chrome.runtime.lastError) {
          console.log("Content script not ready");
        }
      },
    );
  } catch (err) {
    console.log(err);
  }
}
