/**
 * Exports the settings for javascript modules in webpack.config
 *
 * @param {string} ENV Environment to build for, expects 'production' for production and
 */
module.exports = (ENV, PATHS) => {
  return {
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
          comments: (ENV !== 'production') ? true : false,
          cacheDirectory: (ENV !== 'production'),
        },
      },
    ],
  };
};
