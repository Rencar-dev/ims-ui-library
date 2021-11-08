const path = require("path");

module.exports = {
  root: path.resolve(__dirname, "../"),
  outputPath: path.resolve(__dirname, "../", "dist"),
  entryPath: path.resolve(__dirname, "../", "src/index.ts"),
  componentsFolder: path.resolve(__dirname, "../", "src/components"),
  srcFolder: path.resolve(__dirname, "../", "src"),
  utilsFolder: path.resolve(__dirname, "../", "__utils__"),
  distFolder: path.resolve(__dirname, "../", "dist"),
  antdStylesFolder: path.resolve(__dirname, "../", "antdStyles"),
  staticFolder: path.resolve(__dirname, "../", "src/assets/static"),
};
