const path = require('path');

const DLIENT_PORT     = 1988;
const DOMAIN_MODULES  = [
  {
    domain  : 'www.myreact.com',
    cdn     : 'cdn.myreact.com',
    path    : 'www',
  },
  {
    domain  : 'admin.myreact.com',
    cdn     : 'cdn1.myreact.com',
    path    : 'admin',
  }
];

const SRC_DIR        = 'src';
const APP_DIR        = 'app';
const LOG_DIR        = 'logs';
const TEST_DIR       = 'test';
const HAPPYPACK_DIR  = '.happypack';
const WEBPACK_DIR    = '.webpack_cache';
const COMMON_DIR     = 'common';

const DIST_DIR       = 'dist';
const ASSETS_DIR     = 'assets';


const ROOT_PATH      = path.join(__dirname, '../');
const APP_PATH       = path.resolve(ROOT_PATH, SRC_DIR, APP_DIR);

const HAPPYPACK_PATH = path.join(ROOT_PATH, HAPPYPACK_DIR);
const WEBPACK_PATH   = path.join(ROOT_PATH, WEBPACK_DIR);

const DIST_PATH       = path.join(ROOT_PATH, DIST_DIR);
const ASSETS_PATH    = path.join(DIST_PATH, ASSETS_DIR);
const LOG_PATH       = path.join(ROOT_PATH, LOG_DIR);

const ROOT_COMMON    = path.join(ROOT_PATH, COMMON_DIR);
const APP_COMMON     = path.join(ROOT_PATH, APP_PATH);

module.exports = {
  DLIENT_PORT,
  DOMAIN_MODULES,

  SRC_DIR,
  APP_DIR,
  LOG_DIR,
  TEST_DIR,
  HAPPYPACK_DIR,
  COMMON_DIR,
  DIST_DIR,
  ASSETS_DIR,

  ROOT_PATH,
  APP_PATH,
  HAPPYPACK_PATH,
  WEBPACK_PATH,
  DIST_PATH,
  ASSETS_PATH,
  LOG_PATH,
  ROOT_COMMON,
  APP_COMMON,
};