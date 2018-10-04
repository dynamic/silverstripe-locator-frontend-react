/* global window document */
import React from 'react';
import { shallow, mount } from 'enzyme';

import { SearchForm, mapStateToProps } from '../../../js/containers/search/SearchForm';
import RadiusDropDown from '../../../js/components/search/RadiusDropDown';
import CategoryDropDown from '../../../js/components/search/CategoryDropDown';

import * as mock from '../../../js/actions/locationActions';

// mock functions
const dispatch = jest.fn();
const fetch = jest.fn();

// setup fetchLocations to use mock function (so it can be checked against later)
mock.fetchLocations = fetch;
jest.setMock('../../../js/actions/locationActions', mock);

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
  // make sure we have everything we need
  expect(search.find(RadiusDropDown).length).toEqual(1);
  expect(search.find(CategoryDropDown).length).toEqual(1);

  search = shallow(
    <SearchForm
      address=""
      radius="-1"
      radii={[]}
      category=""
      categories={[]}
      unit="m"
      autocomplete={true}
      center={{
        lat: 0,
        lng: 0,
      }}
      dispatch={dispatch}
    />,
  );

  expect(search.length).toEqual(1);
  // make sure we have everything we need
  expect(search.find(RadiusDropDown).length).toEqual(1);
  expect(search.find(CategoryDropDown).length).toEqual(1);
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
 * Tests the handleSubmit method of the SearchBar component
 */
test('handleSubmit test', () => {
  // so we don't have annoying warnings about mounting straight to document.body
  const div = document.createElement('div');
  document.body.appendChild(div);

  // mount the component and attach it to the div created above
  const search = mount(
    <SearchForm
      address=""
      radius="-1"
      radii={[]}
      category=""
      categories={[]}
      unit="m"
      dispatch={dispatch}
      autocomplete={false}
      center={{
        lat: 0,
        lng: 0,
      }}
    />,
    {
      attachTo: div,
    },
  );

  // removes the security error
  window.history.pushState = jest.fn();

  // submit and check
  search.find('form').simulate('submit');
  expect(fetch).toBeCalledWith({
    address: '',
    category: '',
    radius: '',
    unit: 'm',
  });

  // test an actual search
  search.find('[name="address"]').instance().value = 'address test';

  // submit and check
  search.find('form').simulate('submit');
  expect(fetch).toBeCalledWith({
    address: 'address test',
    category: '',
    radius: '',
    unit: 'm',
  });

  search.instance().handleSubmit('aaa');
  expect(fetch).toBeCalledWith({
    address: 'aaa',
    category: '',
    radius: '',
    unit: 'm',
  });

  // clean up
  search.detach();
  document.body.removeChild(div);
});

test('handleAddressChange test', () => {
  const search = shallow(
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

  expect(search.instance().searchAddress).toBe('');

  search.instance().handleAddressChange('aaa');
  expect(search.instance().searchAddress).toBe('aaa');
});

/**
 * tests the map state to props method.
 * Only requires that an object is returned, doesn't matter what is in it.
 */
test('Map state to props', () => {
  const state = {
    search: {},
    map: {},
    settings: {},
    locations: {},
  };
  // expects mapStateToProps to be an Object
  expect(mapStateToProps(state)).toEqual(expect.any(Object));
});

