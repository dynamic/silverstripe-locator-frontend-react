import ActionType from 'actions/ActionTypes';

// eslint-disable-next-line import/prefer-default-export
export function changePage(page) {
  return {
    type: ActionType.PAGE_CHANGE,
    payload: page,
  };
}
