import React, {Component} from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { loadComponent } from 'lib/Injector';

class AutoComplete extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      value: '',
    };

    this.renderFunc = this.renderFunc.bind(this);
  }

  renderFunc({ getInputProps, getSuggestionItemProps, suggestions, loading }) {
    const TextField = loadComponent('TextField');
    const inputProps = {
      ...getInputProps(),
      ...this.props,
    };

    return (
      <div className="autocomplete-root">
        <TextField {...inputProps} />
        <div className="autocomplete-dropdown-container">
          {loading && <div>Loading...</div>}
          {suggestions.map(suggestion => (
            <div {...getSuggestionItemProps(suggestion)}>
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
        value={this.state.value}
        onChange={value => this.setState({value})}
      >
        {this.renderFunc}
      </PlacesAutocomplete>
    );
  }
}

export default AutoComplete;
