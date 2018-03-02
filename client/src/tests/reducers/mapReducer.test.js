import ActionType from '../../../src/js/actions/ActionTypes';
import reducer from '../../../src/js/reducers/mapReducer';

const location = {
  ID: 1,
  Title: 'Location',
  Address: 'Address 1',
  Address2: 'Address 2',
  City: 'City',
  State: 'State',
  PostalCode: 'Zip',
  Website: 'http://example.com',
  Phone: '123-456-7777',
  Email: 'd@a.g',
  Distance: -1,
  search: false,
  current: true,
  Lat: 50,
  Lng: 60,
};

/**
 * Tests the default state
 */
test('Map reducer has a default state', () => {
  expect(reducer(undefined, {
    type: 'invalid-type',
  })).toEqual({
    current: -1,
    showCurrent: false,
    isLoading: true,
    center: {
      Lat: 91,
      Lng: 181,
    },
  });
});

/**
 * Tests the MARKER_CLICK state
 */
test('Map reducer has a valid clicked state', () => {
  expect(reducer(undefined, {
    type: ActionType.MARKER_CLICK,
    payload: location,
  })).toEqual({
    current: 1,
    isLoading: true,
    showCurrent: true,
    center: {
      Lat: 50,
      Lng: 60,
    },
  });
});

/**
 * Tests the MARKER_CLOSE state
 */
test('Map reducer has a valid closed state', () => {
  expect(reducer({
    current: 1,
  }, {
    type: ActionType.MARKER_CLOSE,
  })).toEqual({
    current: 1,
    showCurrent: false,
    center: {
      Lat: 91,
      Lng: 181,
    },
  });
});

/**
 * Tests the SEARCH state
 */
test('Map reducer has a valid search state', () => {
  expect(reducer(undefined, {
    type: ActionType.SEARCH,
  })).toEqual({
    current: -1,
    showCurrent: false,
    isLoading: true,
    center: {
      Lat: 91,
      Lng: 181,
    },
  });
});

/**
 * Tests the FETCH_LOCATIONS_LOADING state
 */
test('Map reducer has a valid loading state', () => {
  expect(reducer({
    current: -1,
    showCurrent: false,
    isLoading: false,
  }, {
    type: ActionType.FETCH_LOCATIONS_LOADING,
  })).toEqual({
    current: -1,
    showCurrent: false,
    isLoading: true,
  });
});

/**
 * Tests the FETCH_LOCATIONS_SUCCESS state
 */
test('Map reducer has a valid success state', () => {
  expect(reducer(undefined, {
    type: ActionType.FETCH_LOCATIONS_SUCCESS,
  })).toEqual({
    current: -1,
    showCurrent: false,
    isLoading: false,
    center: {
      Lat: 91,
      Lng: 181,
    },
  });
});
