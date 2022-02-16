const path = require("./paths");

module.exports = {
  mode: "development",
  output: {
    path: path.outputPath,
    filename: (pathData) => pathData.chunk.name === 'index' ? "[name].js" : "[name]/index.js",
    library: {
      name: ["ims-ui-library_v1"], // 라이브러리 네임스페이스 설정
      type: "umd", // 라이브러리 타겟 설정
    },
  },
  plugins: [],
};
