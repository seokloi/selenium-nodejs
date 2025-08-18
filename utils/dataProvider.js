const fs = require("fs");
const path = require("path");

/**
 * Load test data từ file JSON
 * @param {string} filePath
 * @returns {Array} test data array
 */
function loadJSON(filePath) {
  const absPath = path.resolve(__dirname, "..", "data", filePath);
  const raw = fs.readFileSync(absPath, "utf-8");
  return JSON.parse(raw);
}

module.exports = { loadJSON };
