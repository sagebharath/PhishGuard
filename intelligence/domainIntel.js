function domainIntel(url) {
  const domain = new URL(url).hostname;

  const intel = {};

  intel.longDomain = domain.length > 25 ? 1 : 0;

  intel.tooManySubdomains = domain.split(".").length > 4 ? 1 : 0;

  intel.suspiciousWords = /(secure|account|update|verify)/.test(domain) ? 1 : 0;

  intel.randomCharacters = /[a-z]{10,}/.test(domain) ? 1 : 0;

  intel.brandSpoof = /(paypal|google|amazon|bank)/.test(domain) ? 1 : 0;

  return intel;
}
