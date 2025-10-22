// node scripts/generate-third-party.js
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("third-party-licenses.json", "utf8"));

let out = "# Third-Party Licenses\n\n";
out += "Generated: " + new Date().toISOString() + "\n\n";

for (const pkg in data) {
  const item = data[pkg];
  out += "---\n";
  out += `## ${pkg}\n`;
  out += `- License: ${item.licenses}\n`;
  if (item.publisher) out += `- Publisher: ${item.publisher}\n`;
  if (item.repository) out += `- Repository: ${item.repository}\n`;
  if (item.licenseFile)
    out += `- License file location in package: ${item.licenseFile}\n`;
  out += `- More info: ${item.url || ""}\n\n`;
  // Optionally append license text if available in item.licenseText
}
fs.writeFileSync("LICENSE-THIRD-PARTY.md", out);
console.log("Wrote LICENSE-THIRD-PARTY.md");
