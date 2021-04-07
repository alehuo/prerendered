const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const prerenderedConfig = {
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
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-react',
                  {
                    runtime: 'automatic',
                  },
                ],
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    useBuiltIns: 'usage',
                    corejs: '3.8',
                  },
                ],
              ],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.prerendered.json',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    fallback: {
      util: require.resolve('util'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer'),
      url: require.resolve('url'),
    },
  },
  devtool: 'source-map',
  context: __dirname,
  target: 'node',
  plugins: [new CleanWebpackPlugin()],
};

module.exports = [prerenderedConfig];
