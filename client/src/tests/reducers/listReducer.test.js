import ActionType from '../../../src/js/actions/ActionTypes';
import reducer from '../../../src/js/reducers/listReducer';

/**
 * Tests the default state
 */
test('List reducer has a default state', () => {
  expect(reducer(undefined, {
    type: 'invalid-type',
  })).toEqual({
    page: 1,
  });
});

/**
 * Tests the PAGE_CHANGE state
 */
test('List reducer has a valid page change state', () => {
  expect(reducer(undefined, {
    type: ActionType.PAGE_CHANGE,
    payload: 2,
  })).toEqual({
    page: 2,
  });
});

