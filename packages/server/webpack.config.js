const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const NodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const prerenderedConfig = {
  mode: 'production',
  entry: './src/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [path.resolve(__dirname, 'src')],
        exclude: [/node_modules/, /cli/],
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
  externals: [NodeExternals()],
  optimization: {
    minimize: false,
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
  node: {
    fs: 'empty',
    net: 'empty',
    buffer: 'empty',
  },
  plugins: [new CleanWebpackPlugin()],
};

module.exports = [prerenderedConfig];
