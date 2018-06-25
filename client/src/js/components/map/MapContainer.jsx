import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Parser as HtmlToReactParser } from 'html-to-react';
import scrollToElement from 'animated-scroll-to';
import Fragment from 'render-fragment';

import { openMarker, closeMarker } from 'actions/mapActions';
import { changePage } from 'actions/listActions';
import Map from 'components/map/Map';

/**
 * The MapArea component.
 * Renders the map.
 */
export class MapContainer extends Component {
  /**
   * Used to create the Map.
   * needed to allow use of this keyword in handler.
   * @param props
   */
  constructor(props) {
    super(props);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
  }

  /**
   * Generates an array of marker objects to use on the map
   */
  getMarkers() {
    const { locations, template, emailText, websiteText, markerImagePath } = this.props;
    const markers = [];

    const htmlToReactParser = new HtmlToReactParser();

    let i;
    // eslint-disable-next-line no-plusplus
    for (i = 0; i < locations.length; i++) {
      const location = locations[i];
      const { Lat, Lng } = location;
      const loc = {
        ...location,
        EmailText: emailText,
        WebsiteText: websiteText,
      }
      markers[markers.length] = {
        position: {
          lat: Number(Lat),
          lng: Number(Lng),
        },
        key: location.ID,
        defaultAnimation: 2,
        defaultIcon: markerImagePath,
        info: loc,
      };
    }
    return markers;
  }

  /**
   * Fires and event for clicking a marker
   * @param target The marker that was clicked
   */
  handleMarkerClick(target) {
    const { dispatch, locations, defaultLimit } = this.props;
    const location = locations.find(loc => loc.ID === target.key);
    dispatch(openMarker(location));

    // change the page
    const index = locations.findIndex(l => l.ID === target.key) + 1;
    const page = Math.ceil(index / defaultLimit);

    dispatch(changePage(page));

    // scroll to location in list
    const element = document.getElementById(`loc-${target.key}`);
    if (element !== null) {
      const scrollContainer = document.getElementsByClassName('loc-list-container')[0];
      scrollToElement(element, {
        element: scrollContainer,
        minDuration: 500,
        maxDuration: 750,
        cancelOnUserAction: false,
      });
    }
  }

  /**
   * Fires event for closing a marker info box
   * @param target The marker that had its info box closed
   */
  handleMarkerClose() {
    const { dispatch } = this.props;
    dispatch(closeMarker());
  }

  render() {
    const { current, showCurrent, clusters, center, defaultCenter, mapStyle } = this.props;
    return (
      <Fragment>
        <Map
          containerElement={
            <div className="map" />
          }
          mapElement={
            <div style={{ height: '100%' }} />
          }
          mapStyle={mapStyle}
          markers={this.getMarkers()}
          onMarkerClick={this.handleMarkerClick}
          onMarkerClose={this.handleMarkerClose}
          current={current}
          showCurrent={showCurrent}
          clusters={clusters}
          center={center}
          defaultCenter={defaultCenter}
        />
      </Fragment>
    );
  }
}

/**
 * Defines the prop types
 * @type {{locations: shim, dispatch: *, current: *, showCurrent: *, clusters: *, template: *, mapStyle: shim, center: (shim|*), defaultCenter: (shim|*)}}
 */
MapContainer.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  locations: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  current: PropTypes.number.isRequired,
  showCurrent: PropTypes.bool.isRequired,
  clusters: PropTypes.bool.isRequired,
  template: PropTypes.func.isRequired,
  mapStyle: PropTypes.oneOfType([
    () => {return null;},
    PropTypes.object,
  ]),
  markerImagePath: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]).isRequired,
  center: PropTypes.shape({
    Lat: PropTypes.number.isRequired,
    Lng: PropTypes.number.isRequired,
  }).isRequired,
  defaultCenter: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
};

/**
 * Defines the default values of the props
 * @type {{locations: Array, mapStyle: null}}
 */
MapContainer.defaultProps = {
  locations: [],
  mapStyle: null,
};

/**
 * Maps that state to props
 * @param state
 * @returns {{current}}
 */
export function mapStateToProps(state) {
  return {
    current: state.map.current,
    showCurrent: state.map.showCurrent,
    clusters: state.settings.clusters,
    template: state.settings.infoWindowTemplate,
    mapStyle: state.settings.mapStyle,
    markerImagePath: state.settings.markerImagePath,
    locations: state.locations.locations,
    center: state.map.center,
    defaultCenter: state.settings.defaultCenter,

    defaultLimit: state.settings.defaultLimit,
    emailText: state.settings.emailText,
    websiteText: state.settings.websiteText,
  };
}

export default connect(mapStateToProps)(MapContainer);
