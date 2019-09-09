/* global window, document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import url from 'url';
import { provideInjector } from 'lib/Injector';
import FormBuilderLoader from 'containers/FormBuilderLoader/FormBuilderLoader';

import { fetchLocations } from 'actions/locationActions';
import { search as searchAction } from 'actions/searchActions';
import { changePage } from 'actions/listActions';
import { createFormSchemaUrl } from 'actions/settingsActions';

export class SearchForm extends Component {
  /**
   * Turns a javascript object into url params.
   * Skips keys without values
   *
   * @param obj
   * @return {string}
   */
  static objToUrl(obj) {
    let vars = '';

    Object.keys(obj).forEach((key) => {
      const value = obj[key];

      // don't add it if its blank
      if (value !== undefined && value !== null && value !== '') {
        vars += `${key}=${value}&`;
      }
    });

    // replaces trailing spaces and '&' symbols then replaces spaces with +
    return vars.replace(/([&\s]+$)/g, '').replace(/(\s)/g, '+');
  }

  /**
   * Removes all actions from the data and will include current url parameters
   * @param data
   * @returns {U}
   */
  static getQueryParameters(data) {
    const { search } = window.location;
    const params = Object.keys(data).reduce((object, key) => {
      if (!key.startsWith('action_')) {
        object[key] = data[key]
      }
      return object
    }, {});

    return { ...url.parse(search, true).query, ...params };
  }

  /**
   * @returns {string|*}
   */
  static getAddress() {
    const params = url.parse(window.location.href, true).query;
    console.log(params);
    if (params.Address) {
      return params.Address;
    }
    return '';
  }

  componentDidMount() {
    const currentAddress = SearchForm.getAddress();
    if (currentAddress !== '' || !navigator.geolocation) {
      return;
    }

    const success = position => {
      const { latitude, longitude } = position.coords;
      const geocoder = new google.maps.Geocoder;

      geocoder.geocode({
        location: {
          lat: latitude,
          lng: longitude,
        }
      }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            this.handleSubmit({
              Address: results[0].formatted_address,
            });
            this.props.dispatch(createFormSchemaUrl());
          }
        }
      });
    };

    const error = failure => {console.log(failure.message)};

    navigator.geolocation.getCurrentPosition(success, error);
  }

  /**
   * 'Submits' form. Really just fires state change and changes the url.
   */
  handleSubmit(data, action) {
    const { dispatch, unit } = this.props;
    const { protocol, host, pathname } = window.location;
    const params = SearchForm.getQueryParameters(data);

    // dispatches search (updates search values)
    dispatch(searchAction(params));

    // dispatches fetch locations (gets the locations)
    dispatch(fetchLocations({
      ...params,
      unit,
    }));

    // changes to the first page of results
    dispatch(changePage(1));

    // changes the url for the window and adds it to the browser history(no redirect)
    const newurl = `${protocol}//${host}${pathname}?${SearchForm.objToUrl(params)}`;
    window.history.pushState({
      path: newurl,
    }, '', newurl);
  }

  /**
   * Renders the component.
   * @returns {XML}
   */
  render() {
    const { identifier, formSchemaUrl } = this.props;
    return (
      <div>
        {formSchemaUrl &&
        <FormBuilderLoader
          identifier={identifier}
          schemaUrl={formSchemaUrl}
          onSubmit={(data, action) => {
            this.handleSubmit(data, action);
            return Promise.resolve();
          }}
        />
        }
      </div>
    );
  }
}

SearchForm.propTypes = {
  unit: PropTypes.string.isRequired,
  autocomplete: PropTypes.bool.isRequired,
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

/**
 * Takes variables/functions from the state and assigns them to variables/functions in the components props.
 *
 * @param state
 * @returns {{address, radius}}
 */
export function mapStateToProps(state) {
  return {
    unit: state.locator.settings.unit,
    autocomplete: state.locator.settings.autocomplete,
    center: state.locator.settings.defaultCenter,
    identifier: 'Locator.SearchForm',
    formSchemaUrl: state.locator.settings.formSchemaUrl,
  };
}

export default compose(
  connect(mapStateToProps),
  // for FormBuilderLoader
  provideInjector
)(SearchForm);
