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
   * Used to create the SearchBar.
   * needed to allow use of this keyword in handler.
   * @param props
   */
  constructor(props) {
    super(props);

    this.searchAddress = props.address;
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }

  /**
   * 'Submits' form. Really just fires state change and changes the url.
   */
  handleSubmit(data, action) {
    // selects dispatch and unit from this.props.
    // const dispatch = this.props.dispatch; const unit = this.props.unit;
    const { dispatch, unit } = this.props;
    const { search, protocol, host, pathname } = window.location;

    // removes all actions from the data
    let params = Object.keys(data).reduce((object, key) => {
      if (!key.startsWith('action_')) {
        object[key] = data[key]
      }
      return object
    }, {});

    params = { ...url.parse(search, true).query, ...params };

    // dispatches search (updates search values)
    dispatch(searchAction(params));

    // dispatches fetch locations (gets the locations)
    dispatch(fetchLocations({
      ...params,
      unit,
    }));

    dispatch(changePage(1));

    // changes the url for the window and adds it to the browser history(no redirect)
    const newurl = `${protocol}//${host}${pathname}?${SearchForm.objToUrl(params)}`;
    window.history.pushState({
      path: newurl,
    }, '', newurl);
  }

  handleAddressChange(searchAddress) {
    this.searchAddress = searchAddress;
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
