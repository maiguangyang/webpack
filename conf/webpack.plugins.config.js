const ExtractTextPlugin   = require('extract-text-webpack-plugin');
const HtmlwebpackPlugin   = require('html-webpack-plugin');
const HappyPack           = require('happypack');
const os                  = require('os');

const pool                = HappyPack.ThreadPool({ size: os.cpus().length });

const {
  DIST_PATH,
}                         = require('./config');


let plugins = [];

/**
 * 拆分css
 */
plugins.push(
  new ExtractTextPlugin('[name].[contenthash:8].css')
);


/**
 * HappyPackPluginS
 */
plugins.push(
  new HappyPack({
    id: 'js',
    cache: true,
    threadPool: pool,
    loaders: [{
      path: ['babel-loader'],
      query: {
        cacheDirectory: '.webpack_cache',
        presets: [
          'es2015',
          'react'
        ]
      }
    }]
  })
);

/**
 * 创建html
 */
plugins.push(
  new HtmlwebpackPlugin({
    filename: `${DIST_PATH}/index.html`,
    template: `${DIST_PATH}/template.html`,
    inject: 'body',
  })
);

module.exports = plugins;