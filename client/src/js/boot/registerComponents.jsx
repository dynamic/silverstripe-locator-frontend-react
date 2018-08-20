import Injector from 'lib/Injector';

import ListLocationContent from 'components/list/ListLocationContent';
import PaginationEnd from 'components/list/PaginationEnd';
import MarkerContent from 'components/map/MarkerContent';

const registerComponents = () => {
  Injector.component.register('PaginationEnd', PaginationEnd);
  Injector.component.register('MarkerContent', MarkerContent);
  Injector.component.register('ListLocationContent', ListLocationContent);
};

export default registerComponents;
