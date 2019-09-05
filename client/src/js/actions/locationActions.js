/* global window */
/* eslint no-param-reassign: ["error", { "props": false }] */
// eslint-disable-next-line import/no-unresolved, import/extensions
import Config from 'lib/Config';
import url from 'url';
import axios from 'axios';

import ActionType from 'actions/ActionTypes';

/**
 * @param str
 * @returns {string}
 */
function trimExcessSlashes(str) {
  if (str.substring(str.length - 1, str.length) === '/') {
    return str.slice(0, -1);
  }
  return str;
}

// eslint-disable-next-line import/prefer-default-export
export function fetchLocations(params) {
  const { absoluteBaseUrl } = Config.getAll();
  const { pathname, search } = window.location;

  const baseUrl = trimExcessSlashes(absoluteBaseUrl);
  const path = trimExcessSlashes(pathname);

  // removed unused query variables
  Object.keys(params).forEach((key) => {
    const param = params[key];
    if (param === null || param === '' || param === -1) {
      delete params[key];
    }
  });

  const paramaters = {
    ...url.parse(search, true).query,
    ...params,
  };

  return {
    type: ActionType.FETCH_LOCATIONS,
    payload: axios.get(
      `${baseUrl}${path}/json`,
      {
        params: paramaters,
      },
    ),
  };
}
