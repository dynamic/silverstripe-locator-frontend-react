import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AutoSizer, } from 'react-virtualized';

import { openMarker } from 'actions/mapActions';
import { changePage } from 'actions/listActions';
import Location from 'components/list/Location';
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

  scrollToCurrentIndex() {
    const { locations, current } = this.props;
    let index = locations.findIndex(l => l.ID === current);
    if (index === -1) {
      index = 0;
    }
    this.list.scrollToRow(index);
  }

  /**
   * Handles a list item click
   * @param target
   */
  handleLocationClick(target) {
    const { dispatch } = this.props;
    dispatch(openMarker(target));
  }

  handlePaginateClick(page) {
    const { dispatch } = this.props;
    dispatch(changePage(page));
  }

  renderList() {
    const {
      page,
      defaultLimit,
      locations,
      current,
      search,
      unit,
      template
    } = this.props;
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
    const { locations, current, page, defaultLimit } = this.props;
    return (
      <div className="loc-list" role="list">
        <div className="loc-list-container">
          <AutoSizer>
            {({ width, height }) =>
              <div className='loc-list-inner' style={{width, height}}>
                {this.renderList()}
              </div>
            }
          </AutoSizer>
        </div>
        <div className="list-pagination">
          <Pagination
            page={page}
            count={locations.length}
            defaultLimit={defaultLimit}
            goToPage={this.handlePaginateClick}
          />
        </div>
      </div>
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
