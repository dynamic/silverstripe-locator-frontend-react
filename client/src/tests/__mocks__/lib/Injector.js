import MarkerContent from '../../../js/components/map/MarkerContent';
import ListLocationContent from '../../../js/components/list/ListLocationContent';
import Pagination from '../../../js/components/list/Pagination';
import PaginationEnd from '../../../js/components/list/PaginationEnd';

var reducers;

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
      default:
        return className;
    }
  }),
  component: {
    register: jest.fn(),
  },
  reducer: {
    register: jest.fn((allReducers) => {reducers = allReducers}),
    getAll: jest.fn(() => reducers),
  },
};
