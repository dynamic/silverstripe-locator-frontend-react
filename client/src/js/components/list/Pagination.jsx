import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PaginationEnd from 'components/list/PaginationEnd';

/**
 * The Pagination component.
 * Renders the pagination for the location list.
 */
class Pagination extends Component {
  /**
   * Gets the last possible page. If there are 13 items with a page limit of 5 there will be 3 pages.
   * @return {number}
   */
  getLastPage() {
    const { count, defaultLimit } = this.props;
    const lim = defaultLimit;

    return Math.ceil(count / defaultLimit);
  }

  /**
   * Gets all the page numbers that should be shown
   * @return {number[]}
   */
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

  /**
   * Renders the page links
   */
  renderPageLinks() {
    const { page, goToPage } = this.props;
    const numbers = this.getPageNumbers();

    return numbers.map((num) => {
      if (page === num) {
        return (
          <li className="page-item active" key={num}>
            <span className="page-link">
              {num}
              <span className="sr-only">({ss.i18n._t('Locator.CURRENT', 'Current')})</span>
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

  /**
   * Renders the Pagination component
   * @return {*}
   */
  render() {
    const { count, page, goToPage } = this.props;
    const previousClasses = page <= 1 ? "page-item disabled" : "page-item";
    const previousAction = page <= 1 ? () => {} : () => goToPage(page - 1);

    const nextClasses = page >= this.getLastPage() ? "page-item disabled" : "page-item";
    const nextAction = page >= this.getLastPage() ? () => {} : () => goToPage(page + 1);


    if (this.getPageNumbers().length > 1) {
      return (
        <React.Fragment>
          <PaginationEnd
            text={String.fromCharCode(171)}
            label={ss.i18n._t('Locator.PREVIOUS_PAGE', 'Previous')}
            classes={previousClasses}
            action={previousAction}
          />
          {this.renderPageLinks()}
          <PaginationEnd
            text={String.fromCharCode(187)}
            label={ss.i18n._t('Locator.NEXT_PAGE', 'Next')}
            classes={nextClasses}
            action={nextAction}
          />
        </React.Fragment>
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
