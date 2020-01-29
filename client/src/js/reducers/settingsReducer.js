/* global dynamic_locator, ss, window */
// eslint-disable-next-line import/no-unresolved, import/extensions
import Config from 'lib/Config';

import ActionType from 'actions/ActionTypes';

const defaultState = {
  loadedSettings: false,
  loadedMapStyle: false,

  mapStyle: null,
  markerImagePath: false,
  searchMarkerImagePath: false,
  clusterImages: [],
  formSchemaUrl: '',

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
 * @param str
 * @returns {string}
 */
function trimExcessSlashes(str) {
  if (str.substring(str.length - 1, str.length) === '/') {
    return str.slice(0, -1);
  }
  return str;
}

/**
 * Constructs the schemaurl for the form
 * @param config
 * @returns {string}
 */
export function getSchemaURL() {
  const { absoluteBaseUrl } = Config.getAll();
  const { pathname, search } = window.location;

  const url = trimExcessSlashes(absoluteBaseUrl);
  const path = trimExcessSlashes(pathname);

  return `${url}${path}/schema${search}`;
}

/**
 * Sets up settings
 * @return {{unit, clusters, limit, radii, categories}}
 */
function settings() {
  return {
    unit: dynamic_locator.unit,
    clusters: dynamic_locator.clusters,
    clusterImages: dynamic_locator.clusterImages,
    limit: dynamic_locator.limit,
    radii: dynamic_locator.radii,
    categories: dynamic_locator.categories,
    defaultCenter: {
      lat: dynamic_locator.defaultCenter.lat,
      lng: dynamic_locator.defaultCenter.lng,
    },
    autocomplete: dynamic_locator.autocomplete,
    markerImagePath: dynamic_locator.markerImagePath,
    searchMarkerImagePath: dynamic_locator.searchMarkerImagePath,
    // defaultLimit: dynamic_locator.defaultLimit,
  };
}

function didSettingsLoad(state = defaultState) {
  const { loadedMapStyle } = state;
  return loadedMapStyle === true;
}

/**
 * The reducer for creating a part in the store for things like radius and categories
 */
export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case ActionType.STORE_CREATED: {
      return {
        ...state,
        formSchemaUrl: getSchemaURL(),
      };
    }

    case ActionType.CREATE_FORM_SCHEMA_URL: {
      return {
        ...state,
        formSchemaUrl: getSchemaURL(),
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
      if (action.payload !== ActionType.FETCH_MAP_STYLE_ERROR) {
        // eslint-disable-next-line no-console
        console.error('Invalid path for map style was specified. Using default style.');
      }
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

    default:
      return state;
  }
}
