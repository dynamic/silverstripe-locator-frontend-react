import ActionType from 'actions/ActionTypes';

export function openMarker(target) {
  return {
    type: ActionType.MARKER_CLICK,
    payload: target,
  };
}

export function closeMarker() {
  return {
    type: ActionType.MARKER_CLOSE,
  };
}
