/* global window */
import React, {Fragment, useEffect} from 'react';
import { useGoogleMap } from '@react-google-maps/api'

export default function MapHooks(props) {
  const map = useGoogleMap();
  const {center, markers, search, searchCenter} = props;

  const getBounds = () => {
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

  useEffect(() => {
    if (center.Lat !== 91 && center.Lng !== 181) {
      map.panTo(new google.maps.LatLng(center.Lat, center.Lng));
      return;
    }

    const bounds = getBounds();
    // don't fit to bounds if only one marker (prevents insane zoom level)
    if (!bounds.getNorthEast().equals(bounds.getSouthWest())) {
      map.fitBounds(bounds);
    }

    const smallerLat = bounds.getNorthEast().lat() > bounds.getSouthWest().lat() ? bounds.getSouthWest().lat() : bounds.getNorthEast().lat();
    const largerLat = bounds.getNorthEast().lat() <= bounds.getSouthWest().lat() ? bounds.getSouthWest().lat() : bounds.getNorthEast().lat();

    const latDistance = largerLat - smallerLat;

    const centerLat = (bounds.getCenter().lat() * (latDistance * .004)) + bounds.getCenter().lat();
    const centerLng = bounds.getCenter().lng();
    const calculatedCenter = new google.maps.LatLng(centerLat, centerLng);
    map.panTo(calculatedCenter);
  });

  return (
    <Fragment/>
  );
}
