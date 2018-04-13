const Path = require('path');


const moduleCSS = require('./css/modules');
const pluginCSS = require('./css/plugins');
const externalJS = require('./js/externals');
const moduleJS = require('./js/modules');
const pluginJS = require('./js/plugins');
const resolveJS = require('./js/resolve');


const PATHS = {
  SRC_CSS: Path.resolve('client', 'src', 'scss'),
  DIST_CSS: Path.resolve('css'),
  SRC_JS: Path.resolve('client', 'src', 'js'),
  DIST_JS: Path.resolve('client', 'dist', 'js'),
};
PATHS.DIST_IMAGES = Path.relative(PATHS.DIST_CSS, Path.resolve('client', 'dist', 'images')),

module.exports = (ENV) => ([
  {
    name: 'js',
    entry: {
      main: Path.join(PATHS.SRC_JS, 'boot', 'index.jsx'),
    },
    output: {
      path: PATHS.DIST_JS,
      filename: '[name].js',
    },
    devtool: (ENV !== 'production') ? 'source-map' : '',
    resolve: resolveJS(PATHS),
    externals: externalJS(),
    module: moduleJS(ENV),
    plugins: pluginJS(ENV),
  },
  {
    name: 'css',
    entry: {
      locator: Path.join(PATHS.SRC_CSS, 'main.scss')
    },
    output: {
      path: PATHS.DIST_CSS,
      filename: 'locator.css',
    },
    devtool: (ENV !== 'production') ? 'source-map' : '',
    module: moduleCSS(ENV, PATHS),
    plugins: pluginCSS(PATHS),
  },
]);
