const path = require("./paths");
const TerserPlugin = require("terser-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  output: {
    path: path.outputPath,
    filename: "[name].js",
    library: {
      name: ["imsui"], // 라이브러리 네임스페이스 설정
      type: "umd", // 라이브러리 타겟 설정
    },
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
