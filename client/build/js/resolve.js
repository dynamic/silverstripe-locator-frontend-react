/**
 * @param {stirng} SRC_JS Path to javascript source
 */
module.exports = (ENV, {
  ROOT,
  MODULES,
  SRC,
  SRC_JS,
}) => (
  {
    modules: [ROOT, SRC, SRC_JS, MODULES],
    extensions: ['.js', '.jsx', '.json'],
  }
);
