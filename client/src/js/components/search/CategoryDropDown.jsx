import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CategoryDropDown extends Component {
  /**
   * Maps the radii into options for the drop down.
   * @returns {Array}
   */
  mappedCategories() {
    const { categories } = this.props;

    return categories.map(category => (
      <option
        value={category.ID}
        key={category.ID}
      >
        {category.Name}
      </option>
    ));
  }

  /**
   * Gets the default value for the dropdown
   * @return {*}
   */
  defaultValue() {
    const { category, categories } = this.props;
    // if the category exists in the dropdown
    if (categories.filter(
        cat => cat.ID === Number(category),
      ).length) {
      return category.toString();
    }
    return '';
  }

  /**
   * Outputs the radius drop down.
   * @returns {*}
   */
  render() {
    const { categories } = this.props;
    if (categories !== undefined && Object.keys(categories).length !== 0) {
      return (
        <div className="category-dropdown form-group">
          <label htmlFor="category" className="sr-only">{ss.i18n._t('Locator.CATEGORY_FIELD', 'Category')}</label>
          <select
            name="category"
            className="form-control"
            defaultValue={this.defaultValue()}
          >
            <option value="">{ss.i18n._t('Locator.CATEGORY_FIELD', 'Category')}</option>
            {this.mappedCategories()}
          </select>
        </div>
      );
    }
    return null;
  }
}

CategoryDropDown.propTypes = {
  category: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  categories: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};

export default CategoryDropDown;
