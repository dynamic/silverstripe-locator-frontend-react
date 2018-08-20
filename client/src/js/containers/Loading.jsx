import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import renderComponent from 'renderComponent';
import { fetchLocations } from 'actions/locationActions';
import { fetchMapStyle } from 'actions/settingsActions';

import Search from 'components/search/SearchBar';
import MapContainer from 'containers/map/MapContainer';
import List from 'containers/list/List';

// exported for tests
export class Loading extends Component {
  /**
   * Called after the component mounts
   */
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchMapStyle());
  }

  /**
   * Should this component update
   * @param nextProps
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps) {
    const { loadedSettings, isLoading } = this.props;
    return (loadedSettings !== nextProps.loadedSettings || isLoading !== nextProps.isLoading);
  }

  /**
   * Called after the component updates
   * @param nextProps
   */
  componentDidUpdate(nextProps) {
    const { loadedSettings, store } = this.props;
    if (loadedSettings !== nextProps.loadedSettings) {
      const {dispatch, unit, address, radius, category} = nextProps;
      dispatch(fetchLocations({
        unit,
        address,
        radius,
        category,
      }));
    }

    renderComponent(<Search />, store, '.locator-search');
    renderComponent(<List />, store, '.locator-list');
    renderComponent(<MapContainer />, store, '.locator-map');
  }

  render() {
    const { isLoading, loadedSettings } = this.props;
    if (isLoading || !loadedSettings) {
      return (
        <div className="loading show">
          <div className="loading-content">
            <div className="spinner" />
            <span>Loading</span>
          </div>
        </div>
      );
    }
    return (
      <div className="loading" />
    );
  }
}

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export function mapStateToProps(state) {
  return {
    isLoading: state.map.isLoading,

    loadedSettings: state.settings.loadedSettings,
    unit: state.settings.unit,
    address: state.search.address,
    radius: state.search.radius,
    category: state.search.category,
  };
}

export default connect(mapStateToProps)(Loading);
