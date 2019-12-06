import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import renderComponent from 'renderComponent';
import { fetchLocations } from 'actions/locationActions';
import { fetchMapStyle } from 'actions/settingsActions';

import Search from 'containers/search/SearchForm';
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
      const { dispatch, unit, Address, Radius, Category } = nextProps;
      dispatch(fetchLocations({
        unit,
        Address,
        Radius,
        Category,
      }));
    }

    renderComponent(<Search store={store}/>, store, '.locator-search');
    renderComponent(<List/>, store, '.locator-list');
    renderComponent(<MapContainer/>, store, '.locator-map');
  }

  render() {
    const { isLoading, loadedSettings } = this.props;
    if (isLoading || !loadedSettings) {
      return (
        <div className="loading show">
          <div className="loading-content">
            <div className="spinner"/>
            <span>Loading</span>
          </div>
        </div>
      );
    }
    return (
      <div className="loading"/>
    );
  }
}

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export function mapStateToProps(state) {
  return {
    isLoading: state.locator.map.isLoading,

    loadedSettings: state.locator.settings.loadedSettings,
    unit: state.locator.settings.unit,
    Address: state.locator.search.Address,
    Radius: state.locator.search.Radius,
    Category: state.locator.search.Category,
  };
}

export default connect(mapStateToProps)(Loading);
