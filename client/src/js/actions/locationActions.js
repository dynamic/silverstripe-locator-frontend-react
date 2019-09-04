/* global window */
/* eslint no-param-reassign: ["error", { "props": false }] */
import axios from 'axios';

import ActionType from 'actions/ActionTypes';

// eslint-disable-next-line import/prefer-default-export
export function fetchLocations(params) {
  const loc = window.location;

  // removed unused query variables
  Object.keys(params).forEach((key) => {
    const param = params[key];
    if (param === null || param === '' || param === -1) {
      delete params[key];
    }
  });

  return {
    type: ActionType.FETCH_LOCATIONS,
    payload: axios.get(
      `${loc.protocol}//${loc.host}${loc.pathname}/json`,
      {
        // same as "params: params"
        params,
      },
    ),
  };
}
