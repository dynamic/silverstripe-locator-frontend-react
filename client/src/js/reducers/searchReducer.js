/* global window */
import ActionType from 'actions/ActionTypes';

const currentURL = new URL(window.location.href);
const defaultState = Object.assign({
  Address: '',
  Radius: -1,
  Category: '',
}, currentURL.searchParams);

delete defaultState.page;

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ActionType.SEARCH:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
