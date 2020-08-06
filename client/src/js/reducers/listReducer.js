import ActionType from 'actions/ActionTypes';
import { getAllURLParameters } from 'generalFunctions';

const { page } = getAllURLParameters();
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
