import Injector from 'lib/Injector';

import ListLocationContent from 'components/list/ListLocationContent';
import PaginationEnd from 'components/list/PaginationEnd';
import MarkerContent from 'components/map/MarkerContent';

const registerComponents = () => {
  Injector.component.registerMany({
    PaginationEnd,
    MarkerContent,
    ListLocationContent,
  });
};

export default registerComponents;
