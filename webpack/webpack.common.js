const path = require("path");
const commonPaths = require("./paths");
const webpack = require("webpack");
const pkg = require("../package.json");
const fs = require("fs");

const tsImportPluginFactory = require("ts-import-plugin");
const tsImportPluginFactoryAntdOption = {
  libraryName: "antd",
  libraryDirectory: "lib",
  style: "css",
};
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const BANNER = [
  "IMS UI LIBRARY 1st Edition",
  "@version " + pkg.version + " | " + new Date().toDateString(),
  "@author " + pkg.author,
  "@license " + pkg.license,
].join("\n");

function getDirectories(_path) {
  return fs.readdirSync(_path).filter(function (file) {
    return fs.statSync(_path + "/" + file).isDirectory();
  });
}

const entryPoints = () => {
  let result;
  result = getDirectories(commonPaths.componentsFolder)
    .map((foldername) => {
      return {
        [foldername]: path.join(
          commonPaths.componentsFolder,
          foldername,
          `${foldername}.tsx`
        ),
      };
    })
    .reduce((a, b) => {
      return { ...a, ...b };
    });
  return result;
};

module.exports = {
  entry: {
    index: path.join(commonPaths.srcFolder, "index.ts"),
    ...entryPoints(),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@src": commonPaths.srcFolder,
      "@components": commonPaths.componentsFolder,
      "@utils": commonPaths.utilsFolder,
      "@antdStyles": commonPaths.antdStylesFolder,
      "@static": commonPaths.staticFolder
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              getCustomTransformers: () => ({
                before: [
                  tsImportPluginFactory(tsImportPluginFactoryAntdOption),
                ],
              }),
              compilerOptions: {
                module: "es2015",
              },
            },
          },
          "eslint-loader",
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(s)?[ca]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  externals: [
    {
      react: "react",
      "react-dom": "react-dom",
    },
  ],
  output: {
    globalObject: "this",
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: BANNER,
      entryOnly: true,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      reportFilename: "bundleSizeReport.html",
      openAnalyzer: false
    })
  ],
};
