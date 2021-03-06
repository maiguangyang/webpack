const path              = require('path');
const webpack           = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const {
  ROOT_PATH,
  APP_PATH,
  DIST_PATH,
}                       = require('./config');

const { plugins, entries }    = require('./webpack.plugins.config.js');

const config = {
  entry : entries,
  output: {
    path: DIST_PATH,
    filename: '[name].[hash:8].js',
    publicPath: '/'
  },

  resolve: {
    alias   : {
      assets: path.join(ROOT_PATH, 'src/assets/'),
    },
    modules : [path.join(ROOT_PATH, 'node_modules')],
  },

  resolveLoader: {
    modules: [path.join(ROOT_PATH, 'node_modules')],
  },

  cache  : true,
  module : {
    rules: [
      {
        test    : /\.(css|scss)$/,
        use     : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use     : [
            {
              loader: 'css-loader',
              options: {
                minimize: process.env.DEVELOP ? false : true,
              }
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                includePaths: [
                  path.join(ROOT_PATH, 'src', 'assets'),
                ]
              }
            },
          ],
        }),
        exclude   : /node_modules/,
        include   : APP_PATH,
      },
      {
        test      : /\.(png|jpg|gif)$/,
        use       : 'url-loader?limit=10000&name=[hash:8].[name].[ext]'
      },
      {
        test    : /\.(js|jsx)$/,
        use     : ['HappyPack/loader?id=js', 'eslint-loader'],
        exclude : /node_modules/,
        include : APP_PATH,
      },
      {
        test    : /\.jade$/,
        use     : ['jade-loader'],
        include : APP_PATH,
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEVELOP__ : !!process.env.DEVELOP,
      __PRODUCT__ : !!process.env.PRODUCT,
      __UNITEST__ : !!process.env.UNITEST,
    }),
  ].concat(plugins)
};

module.exports = config;