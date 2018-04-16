/* global window, dynamic_locator */
import axios from 'axios';

import ActionType from 'actions/ActionTypes';

export function fetchInfoWindow() {
  const loc = window.location;
  const path = dynamic_locator.infoWindowTemplatePath;

  return {
    type: ActionType.FETCH_INFO_WINDOW,
    payload: axios.get(`${loc.protocol}//${loc.host}${path}`),
  };
}

export function fetchList() {
  const loc = window.location;
  const path = dynamic_locator.listTemplatePath;

  return {
    type: ActionType.FETCH_LIST,
    payload: axios.get(`${loc.protocol}//${loc.host}${path}`),
  };
}

export function fetchMapStyle() {
  const loc = window.location;
  const path = dynamic_locator.mapStylePath;

  // so we don't try to fetch the home page of the site
  if (path === '') {
    return {
      type: ActionType.FETCH_MAP_STYLE_ERROR,
      payload: ActionType.FETCH_MAP_STYLE_ERROR,
    };
  }

  return {
    type: ActionType.FETCH_MAP_STYLE,
    payload: axios.get(`${loc.protocol}//${loc.host}/${path}`),
  };
}
