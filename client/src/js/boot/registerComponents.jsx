import Injector from 'lib/Injector';

import PaginationEnd from 'components/list/PaginationEnd';

const registerComponents = () => {
  Injector.component.register('PaginationEnd', PaginationEnd);
};

export default registerComponents;
