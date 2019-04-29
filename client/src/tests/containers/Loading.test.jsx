import React from 'react';
import { shallow } from 'enzyme';

import { Loading, mapStateToProps } from '../../js/containers/Loading';

import SearchForm from '../../js/containers/search/SearchForm';
import MapContainer from '../../js/containers/map/MapContainer';
import List from '../../js/containers/list/List';

import * as locationActions from '../../js/actions/locationActions';
import * as settingsActions from '../../js/actions/settingsActions';

// mock the fetchLocations action (because of axios)
locationActions.fetchLocations = jest.fn();
jest.setMock('../../js/actions/locationActions', locationActions);

// mock the actions (because of axios)
settingsActions.fetchInfoWindow = jest.fn();
settingsActions.fetchList = jest.fn();
settingsActions.fetchMapStyle = jest.fn();
jest.setMock('../../js/actions/settingsActions', settingsActions);

const dispatch = jest.fn();


test('Loading component should render', () => {
  const props = {
    isLoading: true,
    loadedSettings: true,
    unit: 'm',
    address: '',
    radius: '',
    category: '',
    dispatch,
  };
  const loading = shallow(
    <Loading {...props} />,
  );

  expect(loading.length).toEqual(1);
});

test('Loading component should be showing', () => {
  const props = {
    isLoading: true,
    loadedSettings: true,
    unit: 'm',
    address: '',
    radius: '',
    category: '',
    dispatch,
  };
  const loading = shallow(
    <Loading {...props} />,
  );

  expect(loading.hasClass('show')).toEqual(true);
});

test('Loading component should be hiding', () => {
  const props = {
    isLoading: false,
    loadedSettings: true,
    unit: 'm',
    address: '',
    radius: '',
    category: '',
    dispatch,
  };
  const loading = shallow(
    <Loading {...props} />,
  );

  expect(loading.children().length).toEqual(0);
  expect(loading.hasClass('show')).toEqual(false);
});

test('Loading component should update', () => {
  const props = {
    isLoading: true,
    loadedSettings: false,
    unit: 'm',
    address: '',
    radius: '',
    category: '',
    dispatch,
  };
  const loading = shallow(
    <Loading {...props} />,
  );

  let nextProps = {
    isLoading: true,
    loadedSettings: false,
    unit: 'm',
    address: '',
    radius: '',
    category: '',
    dispatch,
  };
  let shouldUpdate = loading.instance().shouldComponentUpdate(nextProps);
  expect(shouldUpdate).toEqual(false);


  nextProps = {
    isLoading: true,
    loadedSettings: true,
    unit: 'm',
    address: '',
    radius: '',
    category: '',
    dispatch,
  };
  shouldUpdate = loading.instance().shouldComponentUpdate(nextProps);
  expect(shouldUpdate).toEqual(true);
});

test('Loading component did update', () => {
  const props = {
    isLoading: true,
    loadedSettings: false,
    unit: 'm',
    address: '',
    radius: '',
    category: '',
    dispatch,
  };
  const loading = shallow(
    <Loading {...props} />,
  );

  loading.setProps({
    loadedSettings: true,
  });

  expect(dispatch).toBeCalled();
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
