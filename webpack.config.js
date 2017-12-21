//import webpack from 'webpack';
//import path from 'path';
var webpack = require('webpack');
var path = require('path');
const WebpackBundleSizeAnalyzerPlugin = require('webpack-bundle-size-analyzer').WebpackBundleSizeAnalyzerPlugin;
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: [
    './src/client/index.js',
  ],
  output: {
    path: `${__dirname}/src/server/static/dist`,
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx$|\.js$/,
        loader: 'eslint-loader',
        include: `${__dirname}/app`,
        exclude: /bundle\.js$/,
      },
    ],
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin()
    ],    
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }],
  },
};
