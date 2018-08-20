import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import scrollToElement from 'animated-scroll-to';
import Fragment from 'render-fragment';

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
    const {page, defaultLimit, locations, current, search, unit, unitText, emailText, websiteText, directionsText, template} = this.props;
    const realPage = page - 1 ? page - 1 : 0;
    // in case we want to implement a flexible limit
    const lim = defaultLimit;

    return locations.slice(realPage * lim, page * lim).map((location, index) => {
      return <Location
        key={location.ID}
        location={location}
        index={(realPage * lim) + index}
        current={current === location.ID}
        search={search.length > 0}
        unit={unitText}
        websiteText={websiteText}
        directionsText={directionsText}
        emailText={emailText}
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
    current: state.map.current,
    search: state.search.address,
    unit: state.settings.unit,
    unitText: state.settings.unitText,
    directionsText: state.settings.directionsText,
    emailText: state.settings.emailText,
    websiteText: state.settings.websiteText,
    template: state.settings.listTemplate,
    locations: state.locations.locations,
    defaultLimit: state.settings.defaultLimit,
    page: state.list.page,
  };
}


/**
 * export the Map Component
 */
export default connect(mapStateToProps)(List);
