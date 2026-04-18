# 🛡️ PhishGuard

**A real-time phishing detection Chrome extension powered by ML-based URL analysis and risk scoring.**

PhishGuard silently analyzes every website you visit and instantly flags phishing or suspicious pages — right in your browser, with zero external dependencies.

---

## 🚀 Features

- **Real-time URL Analysis** — scans every page on load using 20+ extracted features
- **ML Risk Scoring** — weighted heuristic model scores URLs from 0–100
- **Fusion Engine** — combines URL analysis score with threat reputation feeds
- **Visual Alerts** — color-coded banners appear directly on the page (green / orange / red)
- **Popup Dashboard** — click the extension icon to see the last scan result
- **Trusted Domain Bypass** — major sites like Google, GitHub, Amazon are whitelisted automatically

---

## 🧠 How It Works

```
URL Visited
    │
    ▼
urlAnalyzer.js        ← extracts 20+ features (entropy, TLD, keywords, etc.)
    │
    ▼
mlModel.js            ← scores URL using weighted heuristics (0–100)
    │
    ▼
reputation.js         ← checks external threat intelligence (placeholder → Safe Browsing API)
    │
    ▼
fusionEngine.js       ← combines both scores into a final risk score
    │
    ▼
classifyRisk()        ← SAFE / SUSPICIOUS / PHISHING
    │
    ▼
content.js            ← shows banner on the page
```

---

## 📁 Project Structure

```
PhishGuard/
├── manifest.json          # Chrome Extension Manifest V3
├── background.js          # Service worker — orchestrates the full scan pipeline
├── content.js             # Injects risk banner into visited pages
├── popup.html             # Extension popup UI
├── popup.css              # Popup styles
├── popup.js               # Reads last scan result from Chrome Storage
├── analyzer/
│   └── urlAnalyzer.js     # Extracts 20+ URL features including entropy
├── ml/
│   ├── mlModel.js         # Weighted ML scoring model
│   └── fusionEngine.js    # Combines URL score + reputation score
├── reputation/
│   └── reputation.js      # Threat intelligence hook (extendable)
├── domain/
│   └── domainIntel.js     # Domain-level heuristic checks
└── train_model.py         # Python script to train Random Forest model on phishing datasets
```

---

## 🔍 URL Features Analyzed

| Feature | Description |
|---|---|
| URL Length | Long URLs are a common phishing indicator |
| Entropy | High randomness suggests obfuscation |
| IP Address | Numeric hostnames bypass DNS trust |
| `@` Symbol | Used to mask real destination |
| Suspicious TLD | `.tk`, `.ml`, `.ga`, `.cf` flagged |
| Brand Keywords | `paypal`, `amazon`, `google` in non-brand domains |
| Login Keywords | `login`, `verify`, `account`, `update` in path |
| Subdomain Depth | Excessive subdomains indicate spoofing |
| URL Shorteners | `bit.ly`, `tinyurl`, `t.co` flagged |
| Encoded Characters | `%xx` sequences used to hide malicious paths |
| Repeated Characters | Pattern abuse like `aaaa` in hostnames |
| Double Slash Redirect | `//` after position 7 indicates redirects |
| HTTPS | HTTP (non-secure) sites penalized |
| Query String Length | Long query params can hide payloads |

---

## ⚙️ Installation (Load as Unpacked Extension)

1. Clone this repo:
   ```bash
   git clone https://github.com/sagebharath/PhishGuard.git
   ```

2. Open Chrome and go to:
   ```
   chrome://extensions/
   ```

3. Enable **Developer Mode** (top right toggle)

4. Click **"Load unpacked"** and select the `PhishGuard` folder

5. Visit any website — PhishGuard starts scanning automatically

---

## 🤖 Training the ML Model (Optional)

A companion Python script trains a Random Forest classifier on labeled phishing datasets:

```bash
pip install pandas scikit-learn joblib
python train_model.py
```

> Requires a `phishing_dataset.csv` with labeled URL features. The trained model is saved as `phishguard_model.pkl`.

---

## 🔮 Roadmap

- [ ] Integrate Google Safe Browsing API in `reputation.js`
- [ ] Replace heuristic model with trained `phishguard_model.pkl` via ONNX
- [ ] Add domain age checking via WHOIS
- [ ] Build a reported URLs community database
- [ ] Firefox support (Manifest V2 compatibility)

---

## 🛠️ Tech Stack

- **JavaScript** (Chrome Extensions API — Manifest V3)
- **Python** (scikit-learn, pandas, joblib)
- **Chrome APIs:** `webNavigation`, `tabs`, `storage`, `activeTab`

---

## 📄 License

MIT License — feel free to use, modify, and build on this.

---

> Built by [Sakarey Parangi Bharath](https://github.com/sagebharath) as part of a cybersecurity project portfolio.
