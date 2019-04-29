/* global window document */
import React from 'react';
import { shallow, mount } from 'enzyme';

import { SearchForm, mapStateToProps } from '../../../js/containers/search/SearchForm';

import * as locationActions from '../../../js/actions/locationActions';

// mock functions
const dispatch = jest.fn();
const fetch = jest.fn();

// setup fetchLocations to use mock function (so it can be checked against later)
locationActions.fetchLocations = fetch;
jest.setMock('../../../js/actions/locationActions', locationActions);

/*
jest.mock('containers/FormBuilderLoader/FormBuilderLoader', () => ()=> <div id="FormBuilderLoader">
    FormBuilderLoader
</div>);
*/
// mocks the google api
window.google = {
  maps: {
    LatLng: class{},
  },
};

test('SearchBar component should render', () => {
  let search = shallow(
    <SearchForm
      address=""
      radius={-1}
      radii={[]}
      category=""
      categories={[]}
      unit="m"
      autocomplete={false}
      center={{
        lat: 0,
        lng: 0,
      }}
      dispatch={dispatch}
    />,
  );

  expect(search.length).toEqual(1);
});

/**
 * Tests the objToURL method of the SearchBar component.
 * Tests an empty object, an object with a single key/value pair, and an object with multiple key/value pairs with spaces in the values.
 */
test('objToURL test', () => {
  const toURL = SearchForm.objToUrl;

  // when an empty object is passed
  expect(toURL({})).toEqual('');

  // an object with a single key/value pair is passed
  expect(toURL({
    a: '01100001',
  })).toEqual('a=01100001');

  // an object with multiple key/value pairs is passed, with spaces
  expect(toURL({
    hello: '01101000 01100101 01101100 01101100 01101111 00001101 00001010',
    world: '01110111 01101111 01110010 01101100 01100100',
    empty: '',
  })).toEqual(
    'hello=01101000+01100101+01101100+01101100+01101111+00001101+00001010' +
    '&world=01110111+01101111+01110010+01101100+01100100',
  );
});

/**
 * tests the map state to props method.
 * Only requires that an object is returned, doesn't matter what is in it.
 */
test('Map state to props', () => {
  const state = {
    locator: {
      search: {},
      map: {},
      settings: {},
      locations: {},
    },
  };
  // expects mapStateToProps to be an Object
  expect(mapStateToProps(state)).toEqual(expect.any(Object));
});

