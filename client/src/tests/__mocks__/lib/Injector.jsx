import React, { Component } from 'react';

import MarkerContent from '../../../js/components/map/MarkerContent';
import ListLocationContent from '../../../js/components/list/ListLocationContent';
import Pagination from '../../../js/components/list/Pagination';
import PaginationEnd from '../../../js/components/list/PaginationEnd';
import NoResult from '../../../js/components/list/NoResults';

let reducers;

module.exports = {
  loadComponent: jest.fn((className) => {
    switch (className) {
      case 'MarkerContent':
        return MarkerContent;
      case 'ListLocationContent':
        return ListLocationContent;
      case 'Pagination':
        return Pagination;
      case 'PaginationEnd':
        return PaginationEnd;
      case 'NoResult':
        return NoResult;
      default:
        return className;
    }
  }),
  component: {
    register: jest.fn(),
  },
  reducer: {
    register: jest.fn((allReducers) => {
      reducers = allReducers;
    }),
    getAll: jest.fn(() => reducers),
  },
  provideInjector: jest.fn((Injectable, injectorContainer) => {
    class InjectorProvider extends Component {
      getChildContext() {
        const { component, form, query } = injectorContainer;

        return {
          injector: {
            query: query.get.bind(query),
            get: component.get.bind(component),
            validate: form.getValidation.bind(form),
          },
        };
      }

      render() {
        return <Injectable {...this.props} />;
      }
    }

    return InjectorProvider;
  }),
};
