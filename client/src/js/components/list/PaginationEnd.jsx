import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * The Pagination component.
 * Renders the pagination for the location list.
 */
class PaginationEnd extends Component {
  render() {
    const { text, label, classes, action } = this.props;
    return (
      <li className={classes}>
        <a className="page-link" aria-label={label} onClick={action}>
          <span aria-hidden="true">{text}</span>
          <span className="sr-only">{label}</span>
        </a>
      </li>
    );
  }
}

PaginationEnd.propTypes = {
  text: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  classes: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
}

export default PaginationEnd;
