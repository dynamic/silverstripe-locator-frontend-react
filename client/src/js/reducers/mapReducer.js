import ActionType from 'actions/ActionTypes';

const defaultState = {
  current: -1,
  showCurrent: false,
  isLoading: true,
  // center is invalid, can't be shown on map
  // see the Map component (Map.jsx)
  center: {
    Lat: 91.0,
    Lng: 181.0,
  },
  searchCenter: {
    Lat: 91.0,
    Lng: 181.0,
  },
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ActionType.MARKER_CLICK:
      return {
        ...state,
        current: action.payload.ID,
        showCurrent: true,
        center: {
          Lat: action.payload.Lat,
          Lng: action.payload.Lng,
        },
      };

    case ActionType.MARKER_CLOSE:
      return {
        ...state,
        showCurrent: false,
        center: defaultState.center,
      };

    case ActionType.SEARCH:
      return {
        ...state,
        current: -1,
        showCurrent: false,
      };

    case ActionType.FETCH_LOCATIONS_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case ActionType.FETCH_LOCATIONS_SUCCESS: {
      const center = action.payload !== undefined && action.payload.data.center !== undefined ?
        action.payload.data.center :
        defaultState.center;
      return {
        ...state,
        isLoading: false,
        searchCenter: center,
      };
    }

    default:
      return state;
  }
}
