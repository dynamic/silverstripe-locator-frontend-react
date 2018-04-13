const webpack = require('webpack');

module.exports = (ENV) => {
  return [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(ENV),
      },
    }),
  ];
};
