import ActionType from '../../../src/js/actions/ActionTypes';
import reducer from '../../../src/js/reducers/searchReducer';

/**
 * Tests the default state
 */
test('Search reducer has a default state', () => {
  expect(reducer(undefined, {
    type: 'invalid-type',
  })).toEqual({
    Address: '',
    Radius: -1,
    Category: '',
  });
});

/**
 * Tests the SEARCH state
 */
test('Search reducer has a valid search state', () => {
  expect(reducer(undefined, {
    type: ActionType.SEARCH,
    payload: {
      Address: 'test',
      Radius: 25,
      Category: '5',
    },
  })).toEqual({
    Address: 'test',
    Radius: 25,
    Category: '5',
  });
});
