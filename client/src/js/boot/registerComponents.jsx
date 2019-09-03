import Injector from 'lib/Injector';

import ListLocationContent from 'components/list/ListLocationContent';
import PaginationEnd from 'components/list/PaginationEnd';
import MarkerContent from 'components/map/MarkerContent';
import AutoComplete from 'components/search/AutoComplete';

const registerComponents = () => {
  Injector.component.registerMany({
    PaginationEnd,
    MarkerContent,
    ListLocationContent,
    AutoComplete,
  });
};

export default registerComponents;
