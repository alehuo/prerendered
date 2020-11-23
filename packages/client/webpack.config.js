const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const clientConfig = {
  target: "web",
  mode: "production",
  entry: "./src/index",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [path.resolve(__dirname, "src")],
        exclude: [/node_modules/],
        loader: "ts-loader",
        options: {
          configFile: "tsconfig.client.json",
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  devtool: "source-map",
  context: __dirname,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: false,
          ecma: 2016,
          mangle: false,
          sourceMap: true,
        },
        test: /\.js(\?.*)?$/i,
      }),
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};

module.exports = [clientConfig];
