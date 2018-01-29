import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * The Pagination component.
 * Renders the pagination for the location list.
 */
class Pagination extends Component {
  getLastPage() {
    const { count, defaultLimit } = this.props;
    const lim = defaultLimit;

    return Math.ceil(count / defaultLimit);
  }

  getPageNumbers() {
    const { page } = this.props;
    const lastPage = this.getLastPage();
    const range = 2;

    let rangeStart = page - range;
    let rangeEnd = page + range;

    if (rangeEnd > lastPage) {
      rangeEnd = lastPage;
      rangeStart = lastPage - range * 2;
      rangeStart = rangeStart < 1 ? 1 : rangeStart;
    }

    if (rangeStart <= 1) {
      rangeStart = 1;
      rangeEnd = Math.min(range * 2 + 1, lastPage);
    }

    // from https://stackoverflow.com/a/33457557
    return Array(rangeEnd - rangeStart + 1).fill().map((_, index) => rangeStart + index);
  }

  renderPageLinks() {
    const { page, goToPage } = this.props;
    const numbers = this.getPageNumbers();

    return numbers.map((num) => {
      if (page === num) {
        return (
          <li className="page-item active" key={num}>
            <span className="page-link">
              {num}
              <span className="sr-only">(current)</span>
            </span>
          </li>
        );
      } else {
        return (
          <li className="page-item" key={num} onClick={() => goToPage(num)}>
            <a className="page-link">{num}</a>
          </li>
        );
      }
    });
  }

  render() {
    const { count, page, goToPage } = this.props;
    const previousClasses = page === 1 ? "page-item disabled" : "page-item";
    const nextClasses = page === this.getLastPage() ? "page-item disabled" : "page-item";

    if (this.getPageNumbers().length > 1) {
      return (
        <ul className="pagination">
          <li className={previousClasses}>
            <a className="page-link" aria-label="Previous" onClick={() => goToPage(page - 1)}>
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          {this.renderPageLinks()}
          <li className="page-item">
            <a className={nextClasses} aria-label="Next" onClick={() => goToPage(page + 1)}>
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      );
    }
    return null;
  }
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  defaultLimit: PropTypes.number.isRequired,
  goToPage: PropTypes.func.isRequired,
};

export default Pagination;
