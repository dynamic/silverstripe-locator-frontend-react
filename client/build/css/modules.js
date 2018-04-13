const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const Path = require('path');

/**
 * Exports the settings for css modules in webpack.config
 *
 * @param {string} ENV Environment to build for, expects 'production' for production and
 *
 */
module.exports = (ENV, {SRC_JS, SRC_CSS, DIST_CSS, DIST_IMAGES}) => {
  return {
    rules: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: (ENV !== 'production'),
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: (ENV !== 'production'),
                plugins: [
                  autoprefixer(),
                ],
              },
            },
            {
              loader: 'resolve-url-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: (ENV !== 'production'),
                includePaths: [SRC_CSS, SRC_JS],
              },
            },
          ],
          // to counter the `css/` in the ExtractTextPlugin() call
          publicPath: '../',
        }),
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/,
        exclude: /fonts\/([\w_-]+)\.svg$/,
        loader: 'file-loader',
        options: {
          name: Path.join(DIST_IMAGES, '[name].[ext]'),
        },
      },
    ],
  };
};
