/* global ss */
if (typeof ss === 'undefined' || typeof ss.i18n === 'undefined') {
  console.error('Class ss.i18n not defined');
} else {
  ss.i18n.addDictionary('en', {
    'Locator.ADDRESS_FIELD': 'Address or zip code',
    'Locator.CATEGORY_FIELD': 'Category',
    'Locator.RADIUS_FIELD': 'Radius',
    'Locator.FILTER_BUTTON': 'Filter',
    'Locator.SEARCH_BUTTON': 'Search',
    'Locator.NO_RESULTS': 'No Results',
    'Locator.NEXT_PAGE': 'Next',
    'Locator.PREVIOUS_PAGE': 'Previous',
    'Locator.CURRENT': 'Current',
    'Locator.UNIT.m': 'mi',
    'Locator.UNIT.km': 'km',
    'Locator.EMAIL_TEXT': 'Email',
    'Locator.WEBSITE_TEXT': 'Website',
    'Locator.DIRECTIONS_TEXT': 'Directions',
  });
}
