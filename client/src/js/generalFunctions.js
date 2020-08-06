/* global window */

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

/**
 *
 * @param {string,URL,undefined} url
 * @return {array}
 */
export function getAllURLParameters(url) {
  let passedURL = url;
  if (passedURL === undefined) {
    passedURL = new URL(window.location.href);
  }

  if (typeof passedURL !== 'object') {
    passedURL = new URL(passedURL);
  }

  const currentParams = [];
  for (const pair of passedURL.searchParams.entries()) {
    currentParams[pair[0]] = pair[1];
  }
  return currentParams;
}
