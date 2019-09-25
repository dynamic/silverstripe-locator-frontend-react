import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

class AutoComplete extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.renderFunc = this.renderFunc.bind(this);
  }

  handleChange(address) {
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(event, { id: this.props.id, value: address });
    }
  };

  /**
   * Fetches the properties for the input field
   *
   * @returns {object} properties
   */
  getInputProps() {
    const props = {
      className: `${this.props.className} ${this.props.extraClass}`,
      id: this.props.id,
      name: this.props.name,
      disabled: this.props.disabled,
      readOnly: this.props.readOnly,
      value: this.props.value || '',
      placeholder: this.props.placeholder,
      autoFocus: this.props.autoFocus,
      maxLength: this.props.data && this.props.data.maxlength,
      type: this.props.type ? this.props.type : null,
    };

    if (this.props.attributes && !Array.isArray(this.props.attributes)) {
      Object.assign(props, this.props.attributes);
    }

    return props;
  }


  renderFunc({ getInputProps, getSuggestionItemProps, suggestions, loading }) {
    const { id, name, type, extraClass } = this.props;
    const inputProps = {
      ...this.getInputProps(),
      ...getInputProps(),
    };

    return (
      <div className="autocomplete-root">
        <input {...inputProps} />
        <div className="autocomplete-dropdown-container">
          {loading && <div>Loading...</div>}
          {suggestions.map(suggestion => (
            <div {...getSuggestionItemProps(suggestion)} className="suggestion">
              <span>{suggestion.description}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  render() {
    return (
      <PlacesAutocomplete
        value={this.props.value}
        onChange={this.handleChange}
        onSelect={this.handleChange}
        shouldFetchSuggestions={this.props.value.length > 3}
      >
        {this.renderFunc}
      </PlacesAutocomplete>
    );
  }
}

export default AutoComplete;
