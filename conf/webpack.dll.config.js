const array               = require('lodash/array');
const webpack             = require('webpack');
const HtmlwebpackPlugin   = require('html-webpack-plugin');
const CleanWebpackPlugin  = require('clean-webpack-plugin');

const {
  ROOT_PATH,
  APP_PATH,
  DIST_PATH,
  WEBPACK_PATH,
  HAPPYPACK_PATH,
  DOMAIN_MODULES,
}                       = require('./config');


/**
 * 输出html模板文件
 */
let moduleList      = [];
let HtmlPluginList  = [];

DOMAIN_MODULES.forEach((elem) => {
  if ('' != elem.path) {
    moduleList.push(elem.path);
  }
});

moduleList.forEach(function (elem) {
  HtmlPluginList.push(new HtmlwebpackPlugin({
    template      : `${APP_PATH}/${elem}/index.jade`,
    inject        : 'body',
    filename      : `${elem}_temp.html`,
    excludeChunks : array.without(moduleList, elem),
    // chunks        : [`${elem}`],
  }));
});

module.exports = {
  entry: {
    vendor: [
      'lodash',
    ]
  },
  output: {
    path: DIST_PATH,
    filename: '[name].[chunkhash:8].js',
    library: '[name]_[chunkhash:8]'
  },
  externals: {

  },
  module: {
    rules: [
      {
        test    : /\.jade$/,
        use     : ['jade-loader'],
        include : APP_PATH,
      }
    ]
  },
  plugins: [

    /**
     * 清空dist目录
     */
    new CleanWebpackPlugin([
      DIST_PATH,
      WEBPACK_PATH,
      HAPPYPACK_PATH
    ],
    {
      root      : ROOT_PATH,
      verbose   : true,
      dry       : false,
    }),

    /**
     * 生成缓存文件
     */
    new webpack.DllPlugin({
      context: __dirname,
      path: `${DIST_PATH}/[name]-manifest.json`,
      name: '[name]_[chunkhash:8]',
    }),

    /**
     * 压缩公共js
     */
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

    /**
     * 输出html模板文件
     */
    // new HtmlwebpackPlugin({
    //   filename: `${DIST_PATH}/home_temp.html`,
    //   template: `${APP_PATH}/home/index.jade`,
    //   inject: 'body',
    // }),
  ].concat(HtmlPluginList)
};