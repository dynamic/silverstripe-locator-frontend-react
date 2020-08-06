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
  if (url === undefined) {
    url = new URL(window.location.href);
  }

  if (typeof url !== 'URL') {
    url = new URL(url);
  }

  const currentParams = [];
  for (const [param, value] of url.searchParams.entries()) {
    currentParams[param] = value;
  }
  return currentParams;
}
