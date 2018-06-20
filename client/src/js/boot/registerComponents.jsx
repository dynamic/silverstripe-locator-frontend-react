import Injector from 'lib/Injector';

import PaginationEnd from 'components/list/PaginationEnd';
import MarkerContent from 'components/map/MarkerContent';

const registerComponents = () => {
  Injector.component.register('PaginationEnd', PaginationEnd);
  Injector.component.register('MarkerContent', MarkerContent);
};

export default registerComponents;
