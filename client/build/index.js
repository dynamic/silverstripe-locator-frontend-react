const Path = require('path');

const webpackConfig = require('@silverstripe/webpack-config');
const {
// resolveJS,
  externalJS,
  moduleJS,
  pluginJS,
  moduleCSS,
  pluginCSS,
} = webpackConfig;

const resolveJS = require('./js/resolve');


const PATHS = {
  MODULES: 'node_modules',
  FILES_PATH: '../',
  ROOT: Path.resolve(),
  SRC: Path.resolve('client', 'src'),
  DIST: Path.resolve('client', 'dist'),

  SRC_CSS: Path.resolve('client', 'src', 'scss'),
  DIST_CSS: Path.resolve('css'),
  SRC_JS: Path.resolve('client', 'src', 'js'),
  DIST_JS: Path.resolve('client', 'dist', 'js'),
};

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
    resolve: resolveJS(ENV, PATHS),
    externals: externalJS(ENV, PATHS),
    module: moduleJS(ENV, PATHS),
    plugins: pluginJS(ENV, PATHS),
  },
  {
    name: 'css',
    entry: {
      locator: Path.join(PATHS.SRC_CSS, 'main.scss')
    },
    output: {
      path: PATHS.DIST_CSS,
      filename: Path.join('styles', 'locator.css'),
    },
    devtool: (ENV !== 'production') ? 'source-map' : '',
    module: moduleCSS(ENV, PATHS),
    plugins: pluginCSS(ENV, PATHS),
  },
]);
