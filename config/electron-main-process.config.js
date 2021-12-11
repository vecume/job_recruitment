/**
 * While a solution for the TypeScript bundler for the main process is on the works,
 * we will use webpack to generate it.
 */

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const { paths, commonConfig } = require('./webpack.common');

const main = {
  target: 'electron-main',
  devtool: 'source-map',
  mode: process.env.NODE_ENV === 'development' ? 'development': 'production',
  context: path.resolve(__dirname, '..', 'main'),
  entry: {
    main: path.resolve(__dirname, '..', 'main','index.js'),
  },
  node: {
    __dirname: true,
    __filename: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.node$/,
        use: 'node-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
};

const mainSmart = merge.smart(commonConfig, main);
module.exports = mainSmart;
