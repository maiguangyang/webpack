const fs                = require('fs');
const _                 = require('lodash');
const webpack           = require('webpack');
const WebpackMerger     = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const webpackConfig     = require('./webpack.common.config');

const {
  DLIENT_PORT,
  DIST_PATH
}                       = require('./config');

const Config =  WebpackMerger(webpackConfig, {
  devtool : 'source-map',
  plugins : [
    /**
     * BrowserSync 插件
     * 用于本地调试
     * https://www.browsersync.io
     */
    new BrowserSyncPlugin({
      host      : 'localhost',
      port      : DLIENT_PORT,
      open      : false,
      logLevel  : 'debug',
      server    : {
        baseDir : [DIST_PATH],
      },
      ui: {
        port: DLIENT_PORT + 1,
        weinre: {
          port: DLIENT_PORT + 2,
        },
      },
    }),
  ],
});

//启动缓存
if (fs.existsSync(DIST_PATH)) {
  let files = fs.readdirSync(DIST_PATH);
  if (!_.isEmpty(files)) {
    files.forEach(function (elem) {
      let file = elem.split('.');
      if ('json' === file[file.length - 1]) {
        Config.plugins.push(
          new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require(`${DIST_PATH}/${elem}`)
          })
        );
      }
    });
  }
}

module.exports = Config;