/* global window, document */
import React from 'react';

import { applyMiddleware, combineReducers, createStore } from 'redux';

import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
// eslint-disable-next-line import/no-unresolved, import/extensions
import Config from 'lib/Config';
// eslint-disable-next-line import/no-unresolved, import/extensions
import Injector from 'lib/Injector';

import applyDevtools from 'boot/applyDevtools';
import registerComponents from 'boot/registerComponents';
import registerReducers from 'reducers';
import renderComponent from 'renderComponent';

import Loading from 'containers/Loading';
import { createdStore } from 'actions/settingsActions';

document.addEventListener('DOMContentLoaded', () => {
  registerComponents();
  registerReducers();

  const middleware = [
    thunk, promise({
      // new suffixes
      promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR'],
    }),
  ];

  const debugging = Config.get('debugging');
  let runMiddleware = applyMiddleware(...middleware);

  if (debugging) {
    runMiddleware = applyDevtools(runMiddleware);
  }

  const createStoreWithMiddleware = runMiddleware(createStore);

  Injector.ready(() => {
    // need to build initial state of reducers for booting earlier
    const rootReducer = combineReducers(Injector.reducer.getAll());
    const store = createStoreWithMiddleware(rootReducer, {
      config: Config.getAll(),
    });

    Injector.reducer.setStore(store);
    store.dispatch(createdStore());
    window.ss.store = store;

    // renders the locator
    window.setTimeout(() => {
      renderComponent(<Loading store={store}/>, store, '.locator-loading');
    }, 0);
  });
});
