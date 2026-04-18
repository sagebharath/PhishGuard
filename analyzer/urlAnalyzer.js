function analyzeURL(url) {
  const parsed = new URL(url);

  const hostname = parsed.hostname;
  const path = parsed.pathname;

  const features = {};

  features.urlLength = url.length;
  features.numDots = (url.match(/\./g) || []).length;
  features.hasAtSymbol = url.includes("@") ? 1 : 0;
  features.hasHyphen = hostname.includes("-") ? 1 : 0;
  features.subdomainCount = hostname.split(".").length - 2;
  features.hasIPAddress = /^[0-9.]+$/.test(hostname) ? 1 : 0;
  features.https = url.startsWith("https") ? 0 : 1;

  const tld = hostname.split(".").pop();
  const suspiciousTLDs = ["tk", "ml", "ga", "cf"];
  features.suspiciousTLD = suspiciousTLDs.includes(tld) ? 1 : 0;

  features.entropy = calculateEntropy(url);

  features.loginKeyword = /(login|verify|account|update)/.test(url) ? 1 : 0;
  features.brandName = /(paypal|google|amazon|bank)/.test(url) ? 1 : 0;

  features.hasNumbers = /\d/.test(url) ? 1 : 0;
  features.pathDepth = path.split("/").length;

  features.shortener = /(bit.ly|tinyurl|t.co)/.test(url) ? 1 : 0;

  features.queryLength = parsed.search.length;
  features.encodedChars = url.includes("%") ? 1 : 0;
  features.repeatedChars = /(.)\1{3,}/.test(url) ? 1 : 0;

  features.longDomain = hostname.length > 25 ? 1 : 0;

  features.specialChars = (url.match(/[\-\_\=\?\&]/g) || []).length;

  features.doubleSlashRedirect = url.lastIndexOf("//") > 7 ? 1 : 0;

  features.prefixSuffix = hostname.includes("-") ? 1 : 0;

  features.suspiciousPath = /(secure|account|update|verify)/.test(path) ? 1 : 0;

  return features;
}

function calculateEntropy(str) {
  const map = {};

  for (let c of str) {
    map[c] = (map[c] || 0) + 1;
  }

  let entropy = 0;

  for (let k in map) {
    const p = map[k] / str.length;
    entropy -= p * Math.log2(p);
  }

  return entropy;
}
