/* global window, document */
import React from 'react';
import ReactDom from 'react-dom';

import {
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import Injector from 'lib/Injector';

import registerComponents from 'boot/registerComponents';
import reducers from 'reducers';
import renderComponent from 'renderComponent';

import Loading from 'components/Loading';

/**
 * Writes deeply nested function transformations without the rightward drift of the code.
 * [redux compose]{@link http://redux.js.org/docs/api/compose.html}
 * @returns {Function}
 */
/*
// TODO: uncomment when redux gets updated
function composedMiddleware() {
  return compose(
    applyMiddleware(thunk, promise({
      // new suffixes
      promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR'],
    })),
    // eslint-disable-next-line no-underscore-dangle
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  );
}

// creates the redux store with reducers and middleware
const store = createStore(reducers, composedMiddleware());
*/

const finalCreateStore = compose(
  applyMiddleware(thunk, promise({
    // new suffixes
    promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR'],
  })),
  (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
)(createStore)
const store = finalCreateStore(reducers);

// defers rendering until after content is loaded
document.addEventListener('DOMContentLoaded', () => {
  registerComponents();

  // renders the locator
  renderComponent(<Loading store={store}/>, store, '.locator-loading');
});
