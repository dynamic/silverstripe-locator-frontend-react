/* global window, document */
import React from 'react';
import ReactDom from "react-dom";
import { Provider } from 'react-redux';

// renders a component to a selector
export default function renderComponent(component, store, selector) {
  // only the first container is used, can change to querySelectorAll() for multiple instances
  const element = document.querySelector(selector);
  if (element) {
    ReactDom.render(
      <Provider store={store}>
        {component}
      </Provider>
      , element
    );
  }
}
