const path = require('path');

const DLIENT_PORT     = 1988;
const DOMAIN_MODULES  = [
  {
    domain  : 'www.myreact.com',
    cdn     : 'cdn.myreact.com',
    path    : 'home',
  },
  {
    domain  : 'user.myreact.com',
    cdn     : 'cdn1.myreact.com',
    path    : 'user',
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

const ROOT_PATH      = path.join(__dirname, '../');
const SRC_PATH       = path.resolve(ROOT_PATH, SRC_DIR);
const APP_PATH       = path.resolve(ROOT_PATH, SRC_DIR, APP_DIR);

const HAPPYPACK_PATH = path.join(ROOT_PATH, HAPPYPACK_DIR);
const WEBPACK_PATH   = path.join(ROOT_PATH, WEBPACK_DIR);
const DIST_PATH       = path.join(ROOT_PATH, DIST_DIR);

const ROOT_COMMON    = path.join(ROOT_PATH, COMMON_DIR);
const APP_COMMON     = path.join(ROOT_PATH, APP_PATH);

module.exports = {
  DLIENT_PORT,
  DOMAIN_MODULES,

  SRC_DIR,
  APP_DIR,
  TEST_DIR,
  HAPPYPACK_DIR,
  COMMON_DIR,
  DIST_DIR,

  ROOT_PATH,
  SRC_PATH,
  APP_PATH,
  HAPPYPACK_PATH,
  WEBPACK_PATH,
  DIST_PATH,
  ROOT_COMMON,
  APP_COMMON,
};