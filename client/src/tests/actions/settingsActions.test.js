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
