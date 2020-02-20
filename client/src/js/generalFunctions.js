/* eslint-disable import/prefer-default-export */

/**
 * @param {array} categories
 * @return {string}
 */
export function categoriesToClasses(categories) {
  let categoriesString = '';
  Object.values(categories).forEach((name) => {
    categoriesString += name.toLowerCase().replace(' ', '-');
  });
  return categoriesString;
}
