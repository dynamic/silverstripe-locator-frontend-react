/* global window */
import ActionType from 'actions/ActionTypes';
import { getAllURLParameters } from 'generalFunctions';

const defaultState = Object.assign({
  Address: '',
  Radius: -1,
  Category: '',
}, getAllURLParameters());

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
