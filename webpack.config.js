const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

const prerenderedConfig = {
  mode: 'production',
  entry: './src/prerendered',
  output: {
    path: path.resolve(__dirname, 'dist', 'lib'),
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'prerendered',
    umdNamedDefine: true,
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [
          path.resolve(__dirname, 'src', 'prerendered'),
        ],
        exclude: [
          /node_modules/,
          /cli/,
        ],
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.prerendered.json',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devtool: 'source-map',
  context: __dirname,
  target: 'web',
  externals: ['react', 'react-dom', 'react-helmet', 'crypto', 'buffer'],
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
    fs: 'empty',
    net: 'empty',
    buffer: 'empty',
  },
};

const cliConfig = {
  mode: 'production',
  entry: './src/cli/cli',
  output: {
    path: path.resolve(__dirname, 'dist', 'cli'),
    filename: 'cli.js',
    libraryTarget: 'umd',
    library: 'prerendered_cli',
    umdNamedDefine: true,
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [
          path.resolve(__dirname, 'src', 'cli'),
        ],
        exclude: [
          /node_modules/,
        ],
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.cli.json',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devtool: 'source-map',
  context: __dirname,
  target: 'node',
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
    fs: 'empty',
    net: 'empty',
    buffer: 'empty',
  },
  plugins: [
    new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true }),
  ],
};

module.exports = [prerenderedConfig, cliConfig];
