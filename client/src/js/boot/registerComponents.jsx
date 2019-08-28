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
  });

  Injector.transform('location-autocomplete-transform', (updater) => {
    updater.component('TextField.Locator.SearchForm', AutoComplete);
  });
};

export default registerComponents;
