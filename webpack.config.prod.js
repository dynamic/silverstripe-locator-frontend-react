/* global process */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const Path = require('path');

const paths = {
  srcJs: Path.resolve('client', 'src', 'js'),
  srcSass: Path.resolve('client', 'src', 'scss'),
  dist: Path.resolve(''),
};

module.exports = {
  entry: {
    main: Path.join(paths.srcJs, 'boot', 'index.jsx'),
    map: Path.join(paths.srcSass, 'main.scss'),
  },
  output: {
    path: paths.dist,
    filename: Path.join('client', 'dist', 'js', '[name].js'),
  },
  devtool: false,
  resolve: {
    modules: [
      paths.srcSass,
      paths.srcJs,
      'node_modules',
    ],
    alias: {
      handlebars: 'handlebars/dist/handlebars.js',
    },
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: [
            'env',
            'react',
          ],
          plugins: ['transform-object-rest-spread'],
          comments: false,
          cacheDirectory: false,
        },
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
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
                sourceMap: true,
                includePaths: [paths.srcSass, paths.srcJs],
              },
            },
          ],
          // to counter the `css/` in the ExtractTextPlugin() call
          publicPath: '../',
        }),
      },
      {
        test: /\.(png|gif|jpe?g|svg)$/,
        loader: 'file-loader',
        options: {
          name: Path.join('client', 'dist', 'images', '[name].[ext]'),
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      // move any modules inside "node_modules" to inside the vendor dist file
      minChunks: module => module.context && module.context.indexOf('/node_modules/') > -1,
    }),
    new ExtractTextPlugin({ filename: Path.join('css', 'locator.css'), allChunks: true }),
  ],
};
