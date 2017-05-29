const os                  = require('os');
const fs                  = require('fs-extra');
const array               = require('lodash/array');
const HappyPack           = require('happypack');
const CopyWebpackPlugin   = require('copy-webpack-plugin');
const SpritesmithPlugin   = require('webpack-spritesmith');
const HtmlwebpackPlugin   = require('html-webpack-plugin');
const SpritesmithTemplate = require('spritesheet-templates');
const ExtractTextPlugin   = require('extract-text-webpack-plugin');


const pool                = HappyPack.ThreadPool({ size: os.cpus().length });

const {
  SRC_PATH,
  APP_PATH,
  DIST_PATH,
  DOMAIN_MODULES,
}                         = require('./config');


let plugins = [];

/**
 * 拆分css
 */
plugins.push(
  new ExtractTextPlugin('[name].[contenthash:8].css')
);


/**
 * 复制项目图片文件
 */
plugins.push(
  new CopyWebpackPlugin([
    {
      from    : `${SRC_PATH}/assets/images/**`,
      to      : `${DIST_PATH}/assets/images/`,
      flatten : true,
    }
  ], {
    copyUnmodified: true,
  })
);

/**
 * 生成项目雪碧图
 */
const SPRITE_DIR           = `${SRC_PATH}/assets/sprites/images/`;
const SPRITE_TEMPLATE_FILE = `${SRC_PATH}/assets/sprites/sprite.scss.template.handlebars`;

if (fs.existsSync(SPRITE_DIR) && fs.lstatSync(SPRITE_DIR).isDirectory() && fs.existsSync(SPRITE_TEMPLATE_FILE)) {
  let source = fs.readFileSync(SPRITE_TEMPLATE_FILE, 'utf8');
  SpritesmithTemplate.addHandlebarsTemplate('spriteScssTemplate', source);

  plugins.push(
    new SpritesmithPlugin({
      src: {
        cwd : SPRITE_DIR,
        glob: '**/*.{png,gif,jpg}',
      },
      target: {
        image: `${DIST_PATH}/assets/images/sprite.[hash:8].png`,
        css  : [
          [
            `${SRC_PATH}/assets/styles/mixins/_sprite.scss`,
            {
              format: 'spriteScssTemplate',
            }
          ]
        ]
      },
      apiOptions: {
        cssImageRef: '/assets/images/sprite.[hash:8].png'
      },
      spritesmithOptions: {
        functions : true,
        padding   : 10,
      }
    })
  );
}

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
          'stage-0'
        ]
      }
    }]
  })
);

/**
 * 输出html模板文件
 */
const entries   = {};
let moduleList  = [];

DOMAIN_MODULES.forEach((elem) => {
  if ('' !== elem.path) {
    moduleList.push(elem.path);
  }
});

moduleList.forEach(function (elem) {
  const dir = `${APP_PATH}/${elem}`;
  if (fs.statSync(dir).isDirectory()) {
    let bootstrapFile = `${dir}/index.js`;

    if (fs.existsSync(bootstrapFile)) {
      entries[elem] = bootstrapFile;

      plugins.push(new HtmlwebpackPlugin({
        template      : `${DIST_PATH}/${elem}_temp.html`,
        inject        : 'body',
        filename      : `${DIST_PATH}/${elem}.html`,
        excludeChunks : array.without(moduleList, elem),
      }));
    }
  }

});

module.exports = {
  plugins,
  entries,
};