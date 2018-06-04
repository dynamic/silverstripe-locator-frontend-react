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

import reducers from 'reducers';
import Locator from 'components/Locator';
import Loading from 'components/Loading';

/**
 * Writes deeply nested function transformations without the rightward drift of the code.
 * [redux compose]{@link http://redux.js.org/docs/api/compose.html}
 * @returns {Function}
 */
function composedMiddleware() {
  return compose(
    applyMiddleware(promise({
      // new suffixes
      promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR'],
    }), thunk),
    // eslint-disable-next-line no-underscore-dangle
    (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  );
}

// creates the redux store with reducers and middleware
const store = createStore(reducers, composedMiddleware());

// renders a component to a selector
function renderComponent(component, selector) {
  ReactDom.render(
    <Provider store={store}>
      {component}
    </Provider>
    // only the first container is used, can change to querySelectorAll() for multiple instances
    , document.querySelector(selector)
  );
}

// defers rendering until after content is loaded (only needed for settings)
document.addEventListener('DOMContentLoaded', () => {
  // renders the locator
  renderComponent(<Locator />, '.locator');
  renderComponent(<Loading />, '.locator-loading');
});
