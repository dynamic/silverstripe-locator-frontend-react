import React from 'react';
import PropTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';

/**
 * Renders every marker
 *
 * @param props
 * @return {Array}
 */
export function markers(props) {
  return props.markers.map(marker => (
    <Marker
      key={marker.key}
      position={marker.position}
      defaultAnimation={marker.defaultAnimation}
      onClick={() => props.onMarkerClick(marker)}
    >
      {props.current === marker.key && props.showCurrent && (
        <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
          <div className="marker-content">{marker.infoContent}</div>
        </InfoWindow>
      )}
    </Marker>
  ));
}

/**
 * Renders the map, with all the markers
 *
 * @param props
 * @return {XML}
 * @constructor
 */
export function Map(props) {
  // we don't want a center if it is invalid
  const opts = {};
  if (props.center.Lat !== 91 && props.center.Lng !== 181) {
    opts.center = {
      lat: props.center.Lat,
      lng: props.center.Lng,
    }
  }
  return (
    <GoogleMap
      defaultZoom={9}
      defaultCenter={{ lat: props.defaultCenter.lat, lng: props.defaultCenter.lng }}
      {...opts}
    >
      {props.clusters === true ? <MarkerClusterer
        averageCenter
        enableRetinaIcons
        gridSize={60}
      >
        {markers(props)}
      </MarkerClusterer> :
        markers(props)}
    </GoogleMap>
  );
}

Map.propTypes = {
  clusters: PropTypes.bool.isRequired,
  center: PropTypes.shape({
    Lat: PropTypes.number.isRequired,
    Lng: PropTypes.number.isRequired,
  }).isRequired,
  defaultCenter: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
};

export default withGoogleMap(Map);
