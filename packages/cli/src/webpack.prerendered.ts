import { dirname, resolve } from "path";
import webpack from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import { WebpackManifestPlugin } from "webpack-manifest-plugin";

export const createConfig = (entry: string, debug = false) => {
  const pathPrefix = "static";
  const tsConfigPath = resolve(__dirname, "tsconfig.prr.json");
  const config: webpack.Configuration = {
    mode: "production",
    entry: resolve(process.cwd(), entry),
    output: {
      path: resolve(process.cwd(), ".prerendered", pathPrefix),
      filename: "[name].[contenthash].js",
      chunkFilename: "[id]-[chunkhash].js",
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: [/node_modules/],
          include: [resolve(process.cwd(), dirname(entry))],
          use: [
            {
              loader: "babel-loader",
              options: {
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
                configFile: tsConfigPath,
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
    target: "node",
    plugins: [
      // @ts-expect-error
      new CleanWebpackPlugin(),
      // @ts-expect-error
      new WebpackManifestPlugin({
        publicPath: `${pathPrefix}/`,
        fileName: resolve(process.cwd(), ".prerendered", "manifest.json"),
      }),
    ],
  };
  if (debug) {
    console.log("tsconfig.prr.json: %s", tsConfigPath);
    console.log("Path prefix: %s", pathPrefix);
    console.log("Webpack configuration: %s", JSON.stringify(config, null, 2));
  }
  return config;
};
