import { dirname, resolve } from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';

export const createConfig = (entry: string, debug = false) => {
  const pathPrefix = 'static';
  const tsConfigPath = resolve(__dirname, 'tsconfig.prr.json');
  const config: webpack.Configuration = {
    mode: 'production',
    entry: resolve(process.cwd(), entry),
    output: {
      path: resolve(process.cwd(), '.prerendered', pathPrefix),
      filename: '[name].[contenthash].js',
      chunkFilename: '[id]-[chunkhash].js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: [
            /node_modules/,
          ],
          include: [resolve(process.cwd(), dirname(entry))],
          loader: 'ts-loader',
          options: {
            configFile: tsConfigPath,
          },
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    devtool: 'source-map',
    target: 'web',
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          parallel: true,
          terserOptions: {
            compress: false,
            ecma: 6,
            mangle: true,
          },
          sourceMap: true,
          test: /\.js(\?.*)?$/i,
        }),
      ],
    },
    node: {
      net: 'empty',
      fs: 'empty',
    },
    plugins: [
      new CleanWebpackPlugin(),
      new ManifestPlugin({
        publicPath: `${pathPrefix}/`,
        fileName: resolve(process.cwd(), '.prerendered', 'manifest.json'),
      }),
    ],
  };
  if (debug) {
    console.log('tsconfig.prr.json: %s', tsConfigPath);
    console.log('Path prefix: %s', pathPrefix);
    console.log('Webpack configuration: %s', JSON.stringify(config, null, 2));
  }
  return config;
};
