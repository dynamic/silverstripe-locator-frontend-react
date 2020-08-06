import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {GoogleMap, Marker, InfoBox, MarkerClusterer, withGoogleMap} from '@react-google-maps/api';
import {loadComponent} from 'lib/Injector';

import {categoriesToClasses} from 'generalFunctions';
import MapHooks from "containers/map/MapHooks";

export class Map extends Component {
  /**
   * Generates the marker props
   * @param props
   * @returns {*}
   */
  getMarkerProps(marker, props) {
    const markerProps = {
      key: marker.key,
      position: marker.position,
      defaultAnimation: marker.defaultAnimation,
      optomized: false,
      onClick: () => props.onMarkerClick(marker),
    };

    if (marker.defaultIcon) {
      markerProps.defaultIcon = {
        url: marker.defaultIcon,
        scaledSize: new window.google.maps.Size(30, 56),
      };
    }

    if (marker.icon) {
      markerProps.icon = {
        url: marker.icon,
        scaledSize: new window.google.maps.Size(30, 56),
      };
    }

    return markerProps;
  }

  /**
   * Generates the markers
   * @param props
   * @returns {*}
   */
  markers(props) {
    const MarkerContent = loadComponent('MarkerContent');
    const markerList = props.markers.map(marker => {

      let className = 'marker-content';
      if (
        marker.hasOwnProperty('info') &&
        marker.info.hasOwnProperty('Categories') &&
        categoriesToClasses(marker.info.Categories) !== ''
      ) {
        className += ' ' + categoriesToClasses(marker.info.Categories);
      }

      return (
        <Marker {...this.getMarkerProps(marker, props)}>
          {props.current === marker.key && props.showCurrent && (
            <InfoBox onCloseClick={() => props.onMarkerClose()}>
              <div className={className}>
                <MarkerContent info={marker.info}/>
              </div>
            </InfoBox>
          )}
        </Marker>
      )
    });
    return this.addSearchMarker(markerList);
  }

  /**
   * Adds default search marker, if a search center is available
   * @param markers
   * @returns {*}
   */
  addSearchMarker(markers) {
    const {searchMarkerImagePath, searchCenter} = this.props;
    if (
      searchMarkerImagePath !== '' &&
      searchCenter.Lat !== 91 &&
      searchCenter.Lng !== 181
    ) {
      markers.push(<Marker
        key="search"
        position={{
          lat: searchCenter.Lat,
          lng: searchCenter.Lng,
        }}
        defaultIcon={{
          url: searchMarkerImagePath,
          scaledSize: new window.google.maps.Size(30, 56),
        }}
        optimized={false}
      />);
    }
    return markers;
  }

  render() {
    const {center, defaultCenter, mapStyle, clusters, clusterStyles, markers, search, searchCenter} = this.props;

    // we don't want a center if it is invalid
    const opts = {
      mapContainerClassName: 'map',
    };
    if (center.Lat !== 91 && center.Lng !== 181) {
      opts.center = {
        lat: center.Lat,
        lng: center.Lng,
      }
    }

    const defaultOptions = {};
    if (mapStyle !== null) {
      defaultOptions.styles = mapStyle;
    }

    return (
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{lat: defaultCenter.lat, lng: defaultCenter.lng}}
        defaultOptions={defaultOptions}
        {...opts}
      >
        <MapHooks
          center={center}
          markers={markers}
          search={search}
          searchCenter={searchCenter}
        />
        {clusters === true ? <MarkerClusterer
            averageCenter
            enableRetinaIcons
            gridSize={60}
            styles={clusterStyles}
          >
            {this.markers(this.props)}
          </MarkerClusterer> :
          this.markers(this.props)}
      </GoogleMap>
    );
  }
}

/**
 *
 * @type {{clusters: *, mapStyle: shim, center: (shim|*), defaultCenter: (shim|*)}}
 */
Map.propTypes = {
  clusters: PropTypes.bool.isRequired,
  clusterStyles: PropTypes.array,
  mapStyle: PropTypes.oneOfType([
    () => {
      return null;
    },
    PropTypes.object
  ]),
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
 * @type {{mapStyle: null}}
 */
Map.defaultProps = {
  mapStyle: null,
  clusterStyles: undefined,
};

export default Map;
