const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Path = require('path');

module.exports = ({DIST_CSS}) => {
  return [
    new ExtractTextPlugin({ filename: 'locator.css', allChunks: true })
  ];
};
