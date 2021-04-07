const path = require("path");
const webpack = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const cliConfig = {
  entry: "./src/cli",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "cli.js",
    libraryTarget: "umd",
    library: "prerendered_cli",
    umdNamedDefine: true,
    globalObject: "this",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [path.resolve(__dirname, "src")],
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    modules: false,
                    useBuiltIns: "usage",
                    corejs: "3.8",
                  },
                ],
              ],
            },
          },
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.cli.json",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".mjs"],
  },
  devtool: "source-map",
  context: __dirname,
  target: "node",
  plugins: [
    new webpack.BannerPlugin({ banner: "#!/usr/bin/env node", raw: true }),
    new CopyPlugin({
      patterns: [{ from: "src/tsconfig.prr.json", to: "tsconfig.prr.json" }],
    }),
    new CleanWebpackPlugin(),
  ],
};

module.exports = [cliConfig];
