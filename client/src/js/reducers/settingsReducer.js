/* global dynamic_locator, ss */
import handlebars from 'handlebars';
import ActionType from 'actions/ActionTypes';

const defaultState = {
  loadedSettings: false,
  loadedWindowTemplate: false,
  loadedListTemplate: false,
  loadedMapStyle: false,

  infoWindowTemplate: null,
  listTemplate: null,
  mapStyle: null,
  markerImagePath: false,

  unit: 'm',

  defaultCenter: {
    lat: 0,
    lng: 0,
  },
  autocomplete: false,
  defaultLimit: 20,

  // eslint-disable-next-line no-underscore-dangle
  emailText: ss.i18n._t('Locator.EMAIL_TEXT', 'Email'),
  // eslint-disable-next-line no-underscore-dangle
  websiteText: ss.i18n._t('Locator.WEBSITE_TEXT', 'Website'),
  // eslint-disable-next-line no-underscore-dangle
  directionsText: ss.i18n._t('Locator.DIRECTIONS_TEXT', 'Directions'),
};

// eslint-disable-next-line no-underscore-dangle
defaultState.unitText = ss.i18n._t(`Locator.UNIT.${defaultState.unit}`, 'mi');

/**
 * Sets up settings
 * @return {{unit, clusters, limit, radii, categories}}
 */
function settings() {
  return {
    unit: dynamic_locator.unit,
    clusters: dynamic_locator.clusters,
    limit: dynamic_locator.limit,
    radii: dynamic_locator.radii,
    categories: dynamic_locator.categories,
    defaultCenter: {
      lat: dynamic_locator.defaultCenter.lat,
      lng: dynamic_locator.defaultCenter.lng,
    },
    autocomplete: dynamic_locator.autocomplete,
    markerImagePath: dynamic_locator.markerImagePath,
    // defaultLimit: dynamic_locator.defaultLimit,
  };
}

function didSettingsLoad(state = defaultState) {
  const { loadedListTemplate, loadedWindowTemplate, loadedMapStyle } = state;
  return loadedListTemplate === true &&
    loadedWindowTemplate === true &&
    loadedMapStyle === true;
}

/**
 * The reducer for creating a part in the store for things like radius and categories
 */
export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ActionType.FETCH_INFO_WINDOW_SUCCESS: {
      const { data } = action.payload;
      const loaded = didSettingsLoad({
        ...state,
        loadedWindowTemplate: true,
      });

      return {
        ...state,
        ...settings(),
        loadedSettings: loaded,
        loadedWindowTemplate: true,
        infoWindowTemplate: handlebars.compile(data),
      };
    }

    case ActionType.FETCH_LIST_SUCCESS: {
      const { data } = action.payload;
      const loaded = didSettingsLoad({
        ...state,
        loadedListTemplate: true,
      });

      return {
        ...state,
        ...settings(),
        loadedSettings: loaded,
        loadedListTemplate: true,
        listTemplate: handlebars.compile(data),
      };
    }

    case ActionType.FETCH_MAP_STYLE_SUCCESS: {
      const { data } = action.payload;
      const loaded = didSettingsLoad({
        ...state,
        loadedMapStyle: true,
      });

      return {
        ...state,
        ...settings(),
        loadedSettings: loaded,
        loadedMapStyle: true,
        mapStyle: data,
      };
    }

    case ActionType.FETCH_MAP_STYLE_ERROR: {
      if (action.payload === ActionType.FETCH_MAP_STYLE_ERROR) {
        const loaded = didSettingsLoad({
          ...state,
          loadedMapStyle: true,
        });

        return {
          ...state,
          ...settings(),
          loadedSettings: loaded,
          loadedMapStyle: true,
        };
      }
      return state;
    }

    default:
      return state;
  }
}
