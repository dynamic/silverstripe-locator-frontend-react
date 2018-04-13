/**
 * @param {stirng} SRC_CSS Path to css source
 */
module.exports = ({ SRC_CSS }) => ({
  modules: [
    SRC_CSS,
    'node_modules',
  ],
});
