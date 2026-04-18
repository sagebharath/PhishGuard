function mlPredict(features) {
  let score = 0;

  if (features.hasIPAddress) score += 40;

  if (features.hasAtSymbol) score += 40;

  if (features.shortener) score += 35;

  if (features.suspiciousTLD) score += 30;

  if (features.brandName) score += 25;

  if (features.loginKeyword) score += 20;

  if (features.suspiciousPath) score += 15;

  if (features.numDots > 4) score += 10;

  if (features.urlLength > 80) score += 10;

  if (features.repeatedChars) score += 10;

  return score;
}
