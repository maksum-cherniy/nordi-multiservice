const fs = require("fs");
const path = require("path");
const htmlFiles = ["index.html", "pages/services.html", "pages/reviews.html"];
const keys = new Set();
for (const file of htmlFiles) {
  const content = fs.readFileSync(path.join(__dirname, "..", file), "utf8");
  const re = /data-translate="([^"]+)"/g;
  let match;
  while ((match = re.exec(content)) !== null) {
    keys.add(match[1]);
  }
}
const translations = require(
  path.join(__dirname, "..", "js", "translations.js"),
);
const missing = {};
for (const lang of Object.keys(translations)) {
  missing[lang] = [];
  for (const key of keys) {
    if (!(key in translations[lang])) missing[lang].push(key);
  }
}
console.log(JSON.stringify(missing, null, 2));
