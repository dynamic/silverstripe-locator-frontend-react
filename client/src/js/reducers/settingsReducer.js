/* global dynamic_locator */
import handlebars from 'handlebars';
import ActionType from 'actions/ActionTypes';

const defaultState = {
  loadedSettings: false,
  loadedWindowTemplate: false,
  loadedListTemplate: false,

  infoWindowTemplate: null,
  listTemplate: null,

  unit: 'm',
};

/**
 * The reducer for creating a part in the store for things like radius and categories
 */
export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ActionType.FETCH_INFO_WINDOW_SUCCESS: {
      const data = action.payload.data;

      let loaded = state.loadedSettings;
      if (state.loadedListTemplate === true) {
        loaded = true;
      }

      return {
        ...state,
        loadedSettings: loaded,
        loadedWindowTemplate: true,
        infoWindowTemplate: handlebars.compile(data),

        unit: dynamic_locator.unit,
        clusters: dynamic_locator.clusters,
        limit: dynamic_locator.limit,
        radii: dynamic_locator.radii,
        categories: dynamic_locator.categories,
      };
    }

    case ActionType.FETCH_LIST_SUCCESS: {
      const data = action.payload.data;

      let loaded = state.loadedSettings;
      if (state.loadedWindowTemplate === true) {
        loaded = true;
      }

      return {
        ...state,
        loadedSettings: loaded,
        loadedListTemplate: true,
        listTemplate: handlebars.compile(data),

        unit: dynamic_locator.unit,
        clusters: dynamic_locator.clusters,
        limit: dynamic_locator.limit,
        radii: dynamic_locator.radii,
        categories: dynamic_locator.categories,
      };
    }

    default:
      return state;
  }
}
