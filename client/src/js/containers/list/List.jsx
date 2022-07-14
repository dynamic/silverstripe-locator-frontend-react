import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import scrollToElement from 'animated-scroll-to';
import { loadComponent } from 'lib/Injector';

import {openMarker} from 'actions/mapActions';
import {changePage} from 'actions/listActions';
import Location from 'containers/list/Location';
import Pagination from 'components/list/Pagination';

/**
 * The List component.
 * Renders the location list.
 */
export class List extends Component {
  /**
   * Used to create the Map.
   * needed to allow use of this keyword in handler.
   * @param props
   */
  constructor(props) {
    super(props);
    // bind actions/handlers
    this.handleLocationClick = this.handleLocationClick.bind(this);
    this.handlePaginateClick = this.handlePaginateClick.bind(this);
  }

  /**
   * Handles a list item click
   * @param target
   */
  handleLocationClick(target) {
    const {dispatch, locations} = this.props;
    const location = locations.find(loc => loc.ID === target);
    dispatch(openMarker(location));

    // scroll to location in list
    const element = document.getElementById(`loc-${target}`);
    if (element !== null) {
      const scrollContainer = document.getElementsByClassName('loc-list-container')[0];
      scrollToElement(element, {
        element: scrollContainer,
        minDuration: 500,
        maxDuration: 750,
        cancelOnUserAction: false,
      });
    }
  }

  /**
   * Handles a pagination item click
   * @param page
   */
  handlePaginateClick(page) {
    const {dispatch} = this.props;
    dispatch(changePage(page));
  }

  /**
   * Renders the list
   */
  renderList() {
    const {page, defaultLimit, locations, current, search, unit, template} = this.props;
    const realPage = page - 1 ? page - 1 : 0;
    // in case we want to implement a flexible limit
    const lim = defaultLimit;

    return locations.slice(realPage * lim, page * lim).map((location, index) => {
      return <Location
        key={location.ID}
        location={location}
        index={(realPage * lim) + index}
        current={current === location.ID}
        search={search}
        unit={unit}
        onClick={this.handleLocationClick}
        template={template}
      />
    });
  }

  /**
   * Renders the component
   * @returns {XML}
   */
  render() {
    const {locations, current, page, defaultLimit} = this.props;
    if (locations.length === 0) {
      const NoResults = loadComponent('NoResults');
      return (<NoResults/>);
    }

    return (
      <Fragment>
        <div className="loc-list-container" role="list">
          {this.renderList()}
        </div>
        <ul className="pagination">
          <Pagination
            page={page}
            count={locations.length}
            defaultLimit={defaultLimit}
            goToPage={this.handlePaginateClick}
          />
        </ul>
      </Fragment>
    );
  }
}

/**
 * Defines the prop types
 * @type {{locations: *}}
 */
List.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  locations: PropTypes.array,
  current: PropTypes.number,
  search: PropTypes.string,
  unit: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  template: PropTypes.func.isRequired,
  defaultLimit: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  unitText: PropTypes.string.isRequired,
  directionsText: PropTypes.string.isRequired,
  emailText: PropTypes.string.isRequired,
  websiteText: PropTypes.string.isRequired,
};

/**
 * Defines the default values of the props
 * @type {{locations: {edges: Array}}}
 */
List.defaultProps = {
  locations: [],
  current: -1,
  search: '',
};

/**
 * Maps that state to props
 * @param state
 * @returns {{current}}
 */
export function mapStateToProps(state) {
  return {
    current: state.locator.map.current,
    search: state.locator.search.Address,
    unit: state.locator.settings.unit,
    unitText: state.locator.settings.unitText,
    directionsText: state.locator.settings.directionsText,
    emailText: state.locator.settings.emailText,
    websiteText: state.locator.settings.websiteText,
    template: state.locator.settings.listTemplate,
    locations: state.locator.locations.locations,
    defaultLimit: state.locator.settings.defaultLimit,
    page: state.locator.list.page,
  };
}


/**
 * export the Map Component
 */
export default connect(mapStateToProps)(List);
