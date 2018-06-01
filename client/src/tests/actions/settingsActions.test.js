/* global window */
import axios from 'axios';
import MockAdaptor from 'axios-mock-adapter';

import ActionType from '../../js/actions/ActionTypes';
import * as actions from '../../js/actions/settingsActions';

// mocks axios so we can test ajax action stuff
const mock = new MockAdaptor(axios);
mock.onAny().reply(200);

/**
 * Tests to see if what the fetch list action returns is valid
 */
test('fetch list action is valid', () => {
  window.dynamic_locator = {
    listTemplatePath: '',
  };
  expect(actions.fetchList()).toEqual({
    type: ActionType.FETCH_LIST,
    payload: new Promise(() => {}),
  });
});

/**
 * Tests to see if what the fetch window action returns is valid
 */
test('fetch window action is valid', () => {
  window.dynamic_locator = {
    infoWindowTemplatePath: '',
  };
  expect(actions.fetchInfoWindow()).toEqual({
    type: ActionType.FETCH_INFO_WINDOW,
    payload: new Promise(() => {}),
  });
});

/**
 * Tests to see if what the fetch map style action returns is valid when no path is set
 */
test('fetch map style action is valid without path', () => {
  window.dynamic_locator = {
    mapStylePath: '',
  };
  expect(actions.fetchMapStyle()).toEqual({
    type: ActionType.FETCH_MAP_STYLE_ERROR,
    payload: ActionType.FETCH_MAP_STYLE_ERROR,
  });
});

/**
 * Tests to see if what the fetch map style action returns is valid when a path is set
 */
test('fetch map style action is valid with path', () => {
  window.dynamic_locator = {
    mapStylePath: 'test/style/path/mapStyle.json',
  };
  expect(actions.fetchMapStyle()).toEqual({
    type: ActionType.FETCH_MAP_STYLE,
    payload: new Promise(() => {}),
  });
});

