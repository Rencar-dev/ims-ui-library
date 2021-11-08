const path = require("path");
const commonPaths = require("./webpack/paths");

module.exports = {
  components: "./src/components/**/*.{js,jsx,ts,tsx}",
  require: [
    path.join(commonPaths.antdStylesFolder, "sass", "antdDateRangePicker.scss"),
  ],
  webpackConfig: require('./webpack.config.js')
};
