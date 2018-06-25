/**
 * @param {stirng} SRC_JS Path to javascript source
 */
module.exports = ( ENV, { SRC_JS }) => {
  return {
    modules: [
      SRC_JS,
      'node_modules',
    ],
    alias: {
      handlebars: 'handlebars/dist/handlebars.js',
    },
    extensions: ['.js', '.jsx', '.json'],
  };
};
