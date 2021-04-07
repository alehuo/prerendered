const path = require("path");
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
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: [
                "@babel/proposal-class-properties",
                "@babel/proposal-object-rest-spread",
              ],
              presets: [
                [
                  "@babel/preset-react",
                  {
                    runtime: "automatic",
                  },
                ],
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
              configFile: "tsconfig.client.json",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    fallback: {
      util: require.resolve("util"),
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer"),
      url: require.resolve("url"),
    },
  },
  devtool: "source-map",
  context: __dirname,
  plugins: [new CleanWebpackPlugin()],
};

module.exports = [clientConfig];
