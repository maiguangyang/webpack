const path              = require('path');
const webpack           = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const {
  APP_PATH,
  DIST_PATH
}                       = require('./config');

const WebpackPlugins    = require('./webpack.plugins.config.js');

const config = {
  entry: {
    app: path.resolve(APP_PATH, 'app.js'),
  },

  output: {
    path: DIST_PATH,
    filename: '[name].[hash:8].js',
    publicPath: '/'
  },
  cache: true,
  module: {
    rules: [
      {
        test      : /\.(css|scss)$/,
        use       : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          loader  : ['css-loader', 'postcss-loader', 'sass-loader?outputStyle=expanded']
        }),
        exclude   : /node_modules/,
        include   : APP_PATH
      },
      {
        test: /\.(js|jsx)$/,
        use       : ['HappyPack/loader?id=js', 'eslint-loader'],
        exclude   : /node_modules/,
        include   : APP_PATH
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEVELOP__ : !!process.env.DEVELOP,
      __PRODUCT__ : !!process.env.PRODUCT,
      __UNITEST__ : !!process.env.UNITEST,
    }),
  ].concat(WebpackPlugins)
};

module.exports = config;