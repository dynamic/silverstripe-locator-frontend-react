/**
 * List of action types.
 * Could just be strings, but I feel better when referencing a constant that doesn't change without erroring.
 */
const ActionTypes = {
  // location fetching
  FETCH_LOCATIONS: 'FETCH_LOCATIONS',

  // settings fetching
  FETCH_INFO_WINDOW: 'FETCH_INFO_WINDOW',
  FETCH_LIST: 'FETCH_LIST',
  FETCH_MAP_STYLE: 'FETCH_MAP_STYLE',

  // Search action
  SEARCH: 'SEARCH',

  // Marker actions
  MARKER_CLICK: 'MARKER_CLICK',
  MARKER_CLOSE: 'MARKER_CLOSE',

  PAGE_CHANGE: 'PAGE_CHANGE',
};

// uses the base FETCH_LOCATIONS to construct resulting actions (can't do this in the actual const)
ActionTypes.FETCH_LOCATIONS_LOADING = `${ActionTypes.FETCH_LOCATIONS}_LOADING`;
ActionTypes.FETCH_LOCATIONS_SUCCESS = `${ActionTypes.FETCH_LOCATIONS}_SUCCESS`;
ActionTypes.FETCH_LOCATIONS_ERROR = `${ActionTypes.FETCH_LOCATIONS}_ERROR`;

// uses the base FETCH_INFO_WINDOW to construct resulting actions (can't do this in the actual const)
ActionTypes.FETCH_INFO_WINDOW_LOADING = `${ActionTypes.FETCH_INFO_WINDOW}_LOADING`;
ActionTypes.FETCH_INFO_WINDOW_SUCCESS = `${ActionTypes.FETCH_INFO_WINDOW}_SUCCESS`;
ActionTypes.FETCH_INFO_WINDOW_ERROR = `${ActionTypes.FETCH_INFO_WINDOW}_ERROR`;

// uses the base FETCH_LIST to construct resulting actions (can't do this in the actual const)
ActionTypes.FETCH_LIST_LOADING = `${ActionTypes.FETCH_LIST}_LOADING`;
ActionTypes.FETCH_LIST_SUCCESS = `${ActionTypes.FETCH_LIST}_SUCCESS`;
ActionTypes.FETCH_LIST_ERROR = `${ActionTypes.FETCH_LIST}_ERROR`;

// uses the base FETCH_MAP_STYLE to construct resulting actions (can't do this in the actual const)
ActionTypes.FETCH_MAP_STYLE_LOADING = `${ActionTypes.FETCH_MAP_STYLE}_LOADING`;
ActionTypes.FETCH_MAP_STYLE_SUCCESS = `${ActionTypes.FETCH_MAP_STYLE}_SUCCESS`;
ActionTypes.FETCH_MAP_STYLE_ERROR = `${ActionTypes.FETCH_MAP_STYLE}_ERROR`;

export default ActionTypes;
