/* global window */
/* eslint no-param-reassign: ["error", { "props": false }] */
import axios from 'axios';

import ActionType from 'actions/ActionTypes';

// eslint-disable-next-line import/prefer-default-export
export function fetchLocations(params) {
  // removed unused query variables
  if (params.address === '') {
    delete params.address;
  }

  if (params.radius === -1) {
    delete params.radius;
  }

  if (params.category === '') {
    delete params.category;
  }

  return {
    type: ActionType.FETCH_LOCATIONS,
    payload: axios.get(
      `${window.dynamic_locator.dataLocation}`,
      {
        // same as "params: params"
        params,
      },
    ),
  };
}
