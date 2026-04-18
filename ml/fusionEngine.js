function fusionEngine(urlScore, reputation) {
  return urlScore + reputation;
}

function classifyRisk(score) {
  if (score < 30) return "SAFE";

  if (score < 70) return "SUSPICIOUS";

  return "PHISHING";
}
