import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadComponent } from 'lib/Injector';

/**
 * The Location component.
 * Used in the location list.
 */
class Location extends Component {
  /**
   * Replaces any trailing '+' and whitespace and any spaces left with '+'
   *
   * @param address
   * @returns String
   */
  static cleanAddress(address) {
    if (address) {
      if (typeof address === 'string') {
        return address.replace(/([+\s]+$)/g, '').replace(/(\s)/g, '+');
      }
    }
    return '';
  }

  /**
   * Rounds the distance
   *
   * @return Boolean | String
   */
  getDistance() {
    const { location } = this.props;
    const distance = location.Distance;

    if (distance === -1) {
      return false;
    }

    return distance.toFixed(2);
  }

  /**
   * Gets the daddr string for google maps directions
   * @returns {string}
   */
  getDaddr() {
    const { location } = this.props;
    let daddr = '';

    if (location.Address) {
      daddr += `${location.Address}+`;
    }

    if (location.Address2) {
      daddr += `${location.Address2}+`;
    }

    if (location.City) {
      daddr += `${location.City}+`;
    }

    if (location.State) {
      daddr += `${location.State}+`;
    }

    if (location.PostalCode) {
      daddr += location.PostalCode;
    }

    return Location.cleanAddress(daddr);
  }

  /**
   * Gets the class for the rendered component
   * @return {string}
   */
  getClassName() {
    const {
      index, current,
    } = this.props;
    let className = 'list-location';
    // if it should be focused
    if (current) {
      className += ' focus';
    }
    // if it is even (needed because the list acts odd with :nth-child)
    if (index % 2 === 0) {
      className += ' even';
    }
    // if it is first (needed because the list acts odd with :nth-child)
    if (index === 0) {
      className += ' first';
    }
    return className;
  }

  /**
   * renders the component
   * @returns {XML}
   */
  render() {
    const {
      location, index, search, unit, directionsText, emailText, websiteText, onClick,
    } = this.props;
    const ListLocationContent = loadComponent('ListLocationContent');

    const loc = {
      ...location,
      Distance: this.getDistance(),
      DirectionsLink: `http://maps.google.com/maps?saddr=${Location.cleanAddress(search)}&daddr=${this.getDaddr()}`,
      DirectionsText: directionsText,
      EmailText: emailText,
      WebsiteText: websiteText,
      Unit: unit,
      Number: index + 1,
    };

    const id = `loc-${location.ID}`;
    const className = this.getClassName();

    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
      <div
        id={id}
        data-markerid={index}
        className={className}
        onClick={() => onClick(location.ID)}
        role="listitem"
      >
        <ListLocationContent location={loc}/>
      </div>
    );
  }
}

/**
 * defines the prop types
 * @type {{location, index: *}}
 */
Location.propTypes = {
  location: PropTypes.shape({
    Title: PropTypes.string,
    Address: PropTypes.string,
    Address2: PropTypes.string,
    City: PropTypes.string,
    State: PropTypes.string,
    PostalCode: PropTypes.string,
    Website: PropTypes.string,
    Phone: PropTypes.string,
    Email: PropTypes.string,
    Distance: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
  current: PropTypes.bool.isRequired,
  search: PropTypes.bool.isRequired,
  unit: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

/**
 * Exports the Location components
 */
export default Location;
