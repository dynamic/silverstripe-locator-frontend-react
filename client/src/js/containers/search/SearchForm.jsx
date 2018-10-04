/* global window, document */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import PlacesAutocomplete from 'react-places-autocomplete';
import {loadComponent, provideInjector} from 'lib/Injector';
import FormBuilderLoader from 'containers/FormBuilderLoader/FormBuilderLoader';

import {fetchLocations} from 'actions/locationActions';
import {search} from 'actions/searchActions';
import {changePage} from 'actions/listActions';

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
    const {dispatch, unit} = this.props;

    // removes all actions from the data
    const params = Object.keys(data).reduce((object, key) => {
      if (!key.startsWith('action_')) {
        object[key] = data[key]
      }
      return object
    }, {});

    // dispatches search (updates search values)
    // dispatch(search(params));

    // dispatches fetch locations (gets the locations)
    dispatch(fetchLocations({
      ...params,
      unit,
    }));

    dispatch(changePage(1));

    // changes the url for the window and adds it to the browser history(no redirect)
    const loc = window.location;
    const newurl = `${loc.protocol}//${loc.host}${loc.pathname}?${SearchForm.objToUrl(params)}`;
    window.history.pushState({
      path: newurl,
    }, '', newurl);
  }

  handleAddressChange(searchAddress) {
    this.searchAddress = searchAddress;
  }

  /**
   * Gets the address input.
   * @return {*}
   */
  getAddressInput() {
    const {address, radii, center, autocomplete} = this.props;
    if (autocomplete === true) {
      const inputProps = {
        value: this.searchAddress,
        onChange: this.handleAddressChange,
        placeholder: ss.i18n._t('Locator.ADDRESS_FIELD', 'Address or zip code'),
        name: 'address',
      };
      const cssClasses = {
        root: 'form-control autocomplete-root',
        input: 'form-control',
      };
      const options = {
        location: new google.maps.LatLng(center.lat, center.lng),
        radius: Math.max(...radii),
      };
      return (<PlacesAutocomplete
        inputProps={inputProps}
        classNames={cssClasses}
        onSelect={this.handleSubmit}
        onEnterKeyDown={this.handleSubmit}
        options={options}
      />);
    }
    return (<input
      type="text"
      name="address"
      className="form-control"
      placeholder={ss.i18n._t('Locator.ADDRESS_FIELD', 'Address or zip code')}
      defaultValue={address}
    />);
  }

  /**
   * Renders the component.
   * @returns {XML}
   */
  render() {
    const {identifier, formSchemaUrl} = this.props;
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
  address: PropTypes.string.isRequired,
  radius: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  category: PropTypes.string.isRequired,

  // eslint-disable-next-line react/forbid-prop-types
  radii: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  categories: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
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
