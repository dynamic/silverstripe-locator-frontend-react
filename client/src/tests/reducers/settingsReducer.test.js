/* global window */
import handlebars from 'handlebars';

import ActionType from '../../../src/js/actions/ActionTypes';
import reducer from '../../../src/js/reducers/settingsReducer';

const compile = jest.fn();
compile.mockReturnValue('template');

// setup fetchLocations to use mock function (so it can be checked against later)
handlebars.compile = compile;
jest.setMock('handlebars', handlebars);

/**
 * Tests the default state
 */
test('Settings reducer has a default state', () => {
  expect(reducer(undefined, {
    type: 'invalid-type',
  })).toEqual({
    infoWindowTemplate: null,
    listTemplate: null,
    loadedListTemplate: false,
    loadedSettings: false,
    loadedWindowTemplate: false,
    loadedMapStyle: false,
    mapStyle: null,
    markerImagePath: false,
    unit: 'm',
    defaultCenter: {
      lat: 0,
      lng: 0,
    },
    defaultLimit: 20,
    autocomplete: false,
    directionsText: 'Directions',
    emailText: 'Email',
    unitText: 'mi',
    websiteText: 'Website',
  });
});

/**
 * Tests FETCH_INFO_WINDOW_SUCCESS
 */
test('Settings reducer has a valid state when a fetch info window action is called', () => {
  window.dynamic_locator = {
    unit: 'm',
    clusters: false,
    limit: 0,
    radii: [],
    categories: [],
    listTemplate: '',
    listTemplatePath: '',
    infoWindowTemplate: '',
    infoWindowTemplatePath: '',
    defaultCenter: {
      lat: 0,
      lng: 0,
    },
    defaultLimit: 20,
    autocomplete: false,
    markerImagePath: false,
  };

  // so settings are loaded
  let state = reducer(undefined, {
    type: ActionType.FETCH_LIST_SUCCESS,
    payload: '',
  });

  state = reducer(state, {
    type: ActionType.FETCH_MAP_STYLE_ERROR,
    payload: ActionType.FETCH_MAP_STYLE_ERROR,
  });

  expect(reducer(state, {
    type: ActionType.FETCH_INFO_WINDOW_SUCCESS,
    payload: '',
  })).toEqual({
    categories: [],
    clusters: false,
    limit: 0,
    infoWindowTemplate: 'template',
    listTemplate: 'template',
    loadedSettings: true,
    loadedListTemplate: true,
    loadedWindowTemplate: true,
    loadedMapStyle: true,
    mapStyle: null,
    markerImagePath: false,
    radii: [],
    unit: 'm',
    defaultCenter: {
      lat: 0,
      lng: 0,
    },
    defaultLimit: 20,
    autocomplete: false,
    directionsText: 'Directions',
    emailText: 'Email',
    unitText: 'mi',
    websiteText: 'Website',
  });
});

/**
 * Tests FETCH_LIST_SUCCESS with everything is defined
 */
test('Settings reducer has a valid state when a fetch list action is called', () => {
  window.dynamic_locator = {
    unit: 'm',
    clusters: false,
    limit: 0,
    radii: [],
    categories: [],
    listTemplate: '',
    listTemplatePath: '',
    infoWindowTemplate: '',
    infoWindowTemplatePath: '',
    defaultCenter: {
      lat: 0,
      lng: 0,
    },
    defaultLimit: 20,
    autocomplete: false,
    markerImagePath: false,
  };

  // so settings are loaded
  let state = reducer(undefined, {
    type: ActionType.FETCH_INFO_WINDOW_SUCCESS,
    payload: '',
  });

  state = reducer(state, {
    type: ActionType.FETCH_MAP_STYLE_ERROR,
    payload: ActionType.FETCH_MAP_STYLE_ERROR,
  });

  expect(reducer(state, {
    type: ActionType.FETCH_LIST_SUCCESS,
    payload: {
      data: '',
    },
  })).toEqual({
    categories: [],
    clusters: false,
    limit: 0,
    infoWindowTemplate: 'template',
    listTemplate: 'template',
    loadedSettings: true,
    loadedListTemplate: true,
    loadedWindowTemplate: true,
    loadedMapStyle: true,
    mapStyle: null,
    markerImagePath: false,
    radii: [],
    unit: 'm',
    defaultCenter: {
      lat: 0,
      lng: 0,
    },
    defaultLimit: 20,
    directionsText: 'Directions',
    emailText: 'Email',
    unitText: 'mi',
    websiteText: 'Website',
    autocomplete: false,
    markerImagePath: false,
  });
});
