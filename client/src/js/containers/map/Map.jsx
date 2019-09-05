import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {GoogleMap, Marker, withGoogleMap} from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';
import {loadComponent} from 'lib/Injector';

export class Map extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidUpdate() {
    const {center} = this.props;
    if (center.Lat !== 91 && center.Lng !== 181) {
      this.mapRef.current.panTo(new google.maps.LatLng(center.Lat, center.Lng));
      return;
    }

    const bounds = this.getBounds();
    // don't fit to bounds if only one marker (prevents insane zoom level)
    if (!bounds.getNorthEast().equals(bounds.getSouthWest())) {
      this.mapRef.current.fitBounds(bounds);
    }

    const smallerLat = bounds.getNorthEast().lat() > bounds.getSouthWest().lat() ? bounds.getSouthWest().lat() : bounds.getNorthEast().lat();
    const largerLat = bounds.getNorthEast().lat() <= bounds.getSouthWest().lat() ? bounds.getSouthWest().lat() : bounds.getNorthEast().lat();

    const latDistance = largerLat - smallerLat;

    const centerLat = (bounds.getCenter().lat() * (latDistance * .004)) + bounds.getCenter().lat();
    const centerLng = bounds.getCenter().lng();
    const calculatedCenter = new google.maps.LatLng(centerLat, centerLng);
    this.mapRef.current.panTo(calculatedCenter);
  }

  getBounds() {
    const {markers, search, searchCenter} = this.props;
    const limit = search ? 3 : markers.length;
    const bounds = new window.google.maps.LatLngBounds();
    markers.slice(0, limit).map(marker => {
      bounds.extend(new window.google.maps.LatLng(
        marker.position.lat,
        marker.position.lng
      ));
    });
    if (searchCenter.Lat !== 91 && searchCenter.Lng !== 181) {
      bounds.extend(new window.google.maps.LatLng(
        searchCenter.Lat,
        searchCenter.Lng
      ));
    }
    return bounds;
  }

  /**
   * Generates the markers
   * @param props
   * @returns {*}
   */
  markers(props) {
    const MarkerContent = loadComponent('MarkerContent');
    const markerList = props.markers.map(marker => (
      <Marker
        key={marker.key}
        position={marker.position}
        defaultAnimation={marker.defaultAnimation}
        defaultIcon={{
          url: marker.defaultIcon,
          scaledSize: new window.google.maps.Size(30, 56),
        }}
        onClick={() => props.onMarkerClick(marker)}
      >
        {props.current === marker.key && props.showCurrent && (
          <InfoBox onCloseClick={() => props.onMarkerClose()}>
            <div className="marker-content">
              <MarkerContent info={marker.info}/>
            </div>
          </InfoBox>
        )}
      </Marker>
    ));
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
    const {center, defaultCenter, mapStyle, clusters} = this.props;

    // we don't want a center if it is invalid
    const opts = {};
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
        ref={this.mapRef}
        defaultZoom={16}
        defaultCenter={{lat: defaultCenter.lat, lng: defaultCenter.lng}}
        defaultOptions={defaultOptions}
        {...opts}
      >
        {clusters === true ? <MarkerClusterer
            averageCenter
            enableRetinaIcons
            gridSize={60}
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
};

export default withGoogleMap(Map);
