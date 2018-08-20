import ListLocationContent from '../../../js/components/list/ListLocationContent';
import MarkerContent from '../../../js/components/map/MarkerContent';

module.exports = {
  loadComponent: jest.fn(className => {
    switch (className) {
      case 'MarkerContent':
        return MarkerContent;
      case 'ListLocationContent':
        return ListLocationContent;
      default:
        return className;
    }
  }),
  component: {
    register: jest.fn(),
  },
};
