const webpack             = require('webpack');
const WebpackMerger       = require('webpack-merge');
const webpackConfig       = require('./webpack.common.config');

module.exports = WebpackMerger(webpackConfig, {
  output: {
    filename   : '[name].[chunkhash:8].js',
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap : false,
      mangle    : false,
      compress  : {
        warnings: false,
      },
      output: {
        comments: false
      },
    }),
  ],
});