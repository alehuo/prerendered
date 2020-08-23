import { dirname, resolve } from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';

export const createConfig = (entry: string): webpack.Configuration => ({
  mode: 'production',
  entry: resolve(process.cwd(), entry),
  output: {
    path: resolve(process.cwd(), '.prerendered'),
    filename: '[name].js',
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
          configFile: resolve(__dirname, 'tsconfig.prr.json'),
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
});
