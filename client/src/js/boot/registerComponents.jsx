import Injector from 'lib/Injector';

import ListLocationContent from 'components/list/ListLocationContent';
import PaginationEnd from 'components/list/PaginationEnd';
import NoResults from 'components/list/NoResults';
import MarkerContent from 'components/map/MarkerContent';
import AutoComplete from 'components/search/AutoComplete';

const registerComponents = () => {
  Injector.component.registerMany({
    PaginationEnd,
    NoResults,
    MarkerContent,
    ListLocationContent,
    AutoComplete,
  });
};

export default registerComponents;
