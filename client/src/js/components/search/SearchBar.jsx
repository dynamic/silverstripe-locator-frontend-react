/* global window, document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSearch, faCheckCircle } from '@fortawesome/fontawesome-free-solid';

import { fetchLocations } from 'actions/locationActions';
import { search } from 'actions/searchActions';
import RadiusDropDown from 'components/search/RadiusDropDown';
import CategoryDropDown from 'components/search/CategoryDropDown';

export class SearchBar extends Component {
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

  static getDropdownValue(name) {
    if (document.getElementsByName(name)[0] !== undefined) {
      return document.getElementsByName(name)[0].value;
    }
    return '';
  }

  /**
   * Used to create the SearchBar.
   * needed to allow use of this keyword in handler.
   * @param props
   */
  constructor(props) {
    super(props);
    // this is in state because only this uses it.
    this.state = {
      showFilter: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }


  /**
   * 'Submits' form. Really just fires state change and changes the url.
   */
  handleSubmit(event) {
    // stops the submit from reloading
    event.preventDefault();

    const address = document.getElementsByName('address')[0].value;
    const radius = SearchBar.getDropdownValue('radius');
    const category = SearchBar.getDropdownValue('category');

    const params = {
      address,
      radius,
      category,
    };

    // selects dispatch and unit from this.props.
    // const dispatch = this.props.dispatch; const unit = this.props.unit;
    const { dispatch, unit } = this.props;

    // dispatches search (updates search values)
    dispatch(search({
      address,
      radius,
      category,
    }));

    // dispatches fetch locations (gets the locations)
    dispatch(fetchLocations({
      ...params,
      unit,
    }));

    // changes the url for the window and adds it to the browser history(no redirect)
    const loc = window.location;
    const newurl = `${loc.protocol}//${loc.host}${loc.pathname}?${SearchBar.objToUrl(params)}`;
    window.history.pushState({
      path: newurl,
    }, '', newurl);
  }

  handleFilter(event) {
    this.setState({
      showFilter: !this.state.showFilter
    });
  }

  /**
   * Renders the component.
   * @returns {XML}
   */
  render() {
    const {
      address, category, radii, categories, unit,
    } = this.props;
    let { radius } = this.props;
    if (typeof radius === 'string') {
      radius = Number(radius);
    }

    const hasFilter = category !== '' || !(radius === '' || radius < 1);

    let filterClasses = this.state.showFilter ? 'filter form-row open' : 'filter form-row closed';

    return (
      <form onSubmit={this.handleSubmit} className="locator-search">
        {/* not a fieldset because no flexbox */}
        <div className="fieldset">
          <div className="address-input input-group">
            <label htmlFor="address" className="sr-only">Address or zip code</label>
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="address or zip code"
              defaultValue={address}
            />
            <span className="input-group-btn">
              <button
                className="btn btn-secondary"
                type="button"
                type="submit"><FontAwesomeIcon icon={faSearch} /></button>
            </span>
          </div>
          <div className="filter-button">
            <button type="button" className="btn btn-link" onClick={this.handleFilter}>Filter{hasFilter &&
              <FontAwesomeIcon icon={faCheckCircle}/>
            }</button>
          </div>
          <div className={filterClasses}>
            <CategoryDropDown categories={categories} category={category} />
            <RadiusDropDown radii={radii} radius={radius} unit={unit} />
          </div>
        </div>
      </form>
    );
  }
}

SearchBar.propTypes = {
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
    // the defaults - for when it gets loaded from the url
    address: state.search.address,
    radius: state.search.radius,
    category: state.search.category,

    // the options
    radii: state.settings.radii,
    categories: state.settings.categories,

    // other
    unit: state.settings.unit,
  };
}

export default connect(mapStateToProps)(SearchBar);
