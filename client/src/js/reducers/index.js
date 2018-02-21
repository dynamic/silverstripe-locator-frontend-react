import {
  combineReducers,
} from 'redux';

import search from 'reducers/searchReducer';
import map from 'reducers/mapReducer';
import settings from 'reducers/settingsReducer';
import locations from 'reducers/locationReducer';
import list from 'reducers/listReducer';

/**
 * Combines the reducers.
 *
 * uses shorthand to set key/values
 * "search" is short for "search: search"
 *
 * @type {Reducer<any>}
 */
const reducers = combineReducers({
  search,
  map,
  settings,
  locations,
  list,
});

export default reducers;
