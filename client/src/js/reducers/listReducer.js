/* global window */
import ActionType from 'actions/ActionTypes';
import url from 'url';

const page = url.parse(window.location.href, true).query.page;

const defaultState = {
  page: isNaN(page) ? 1 : page,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ActionType.PAGE_CHANGE:
      return {
        ...state,
        page: action.payload.page,
      };

    default:
      return state;
  }
}
