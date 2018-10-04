/* global window */
import ActionType from '../../../src/js/actions/ActionTypes';
import reducer from '../../../src/js/reducers/settingsReducer';

const compile = jest.fn();
compile.mockReturnValue('template');

/**
 * Tests the default state
 */
test('Settings reducer has a default state', () => {
  expect(reducer(undefined, {
    type: 'invalid-type',
  })).toEqual({
    loadedSettings: false,
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
    formSchemaUrl: '',
  });
});

/**
 * Tests FETCH_MAP_STYLE_SUCCESS with everything is defined
 */
test('Settings reducer has a valid state when a fetch map styles action is called', () => {
  window.dynamic_locator = {
    unit: 'm',
    clusters: false,
    limit: 0,
    radii: [],
    categories: [],
    defaultCenter: {
      lat: 0,
      lng: 0,
    },
    defaultLimit: 20,
    autocomplete: false,
    markerImagePath: false,
  };

  expect(reducer(undefined, {
    type: ActionType.FETCH_MAP_STYLE_SUCCESS,
    payload: {
      data: 'test',
    },
  })).toEqual({
    categories: [],
    clusters: false,
    limit: 0,
    loadedSettings: true,
    loadedMapStyle: true,
    mapStyle: 'test',
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
    formSchemaUrl: '',
  });
});

/**
 * Tests FETCH_MAP_STYLE_ERROR with everything is defined when not a 'good' error
 */
test("Settings reducer has a valid state when a fetch map styles action is called with a not 'good' error", () => {
  window.dynamic_locator = {
    unit: 'm',
    clusters: false,
    limit: 0,
    radii: [],
    categories: [],
    defaultCenter: {
      lat: 0,
      lng: 0,
    },
    defaultLimit: 20,
    autocomplete: false,
    markerImagePath: false,
  };

  expect(reducer(undefined, {
    type: ActionType.FETCH_MAP_STYLE_ERROR,
    payload: `${ActionType.FETCH_MAP_STYLE_ERROR}__INVALID`,
  })).toEqual({
    categories: [],
    clusters: false,
    limit: 0,
    loadedSettings: true,
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
    formSchemaUrl: '',
  });
});

