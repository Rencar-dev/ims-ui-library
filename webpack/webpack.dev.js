const path = require("./paths");

module.exports = {
  mode: "development",
  output: {
    path: path.outputPath,
    filename: "[name].js",
    library: {
      name: ["imsui"], // 라이브러리 네임스페이스 설정
      type: "umd", // 라이브러리 타겟 설정
    },
  },
  plugins: [],
};
