// build-index.js
// Run with: node build-index.js

const fs = require("fs");
const path = require("path");

const slidesDir = path.join(__dirname, "slides");
const outputFile = path.join(__dirname, "index.json");

// Read all JSON files in slides folder
const files = fs
  .readdirSync(slidesDir)
  .filter(file => file.endsWith(".json"))
  .sort(); // ensures 01-, 02-, 03- order

const slides = [];

files.forEach((file, index) => {
  const filePath = path.join(slidesDir, file);
  const raw = fs.readFileSync(filePath, "utf8");

  let data;
  try {
    data = JSON.parse(raw);
  } catch (err) {
    console.log("Skipping invalid JSON:", file);
    return;
  }

  slides.push({
    id: data.id || file.replace(".json", ""),
    title: data.title || file.replace(".json", ""),
    order: index + 1,
    url: `/slides/${file}`
  });
});

// Write index.json
fs.writeFileSync(
  outputFile,
  JSON.stringify({ slides }, null, 2)
);

console.log("index.json generated successfully");