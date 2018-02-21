/* global window */
import ActionType from 'actions/ActionTypes';
import url from 'url';

const { page } = url.parse(window.location.href, true).query;
const defaultState = {
  page: Number.isNaN(Number(page)) ? 1 : Number(page),
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ActionType.PAGE_CHANGE:
      return {
        ...state,
        page: action.payload,
      };

    default:
      return state;
  }
}
