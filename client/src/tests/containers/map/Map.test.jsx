import React from 'react';
import {shallow} from 'enzyme';

import {Marker} from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox';

import {Map} from '../../../js/containers/map/Map';

const onMarkerClick = jest.fn();
const onMarkerClose = jest.fn();

const shallowMap = shallow(
  <Map
    // eslint-disable-next-line react/jsx-boolean-value
    clusters={true}
    markers={[]}
    clusterImages={[]}
    defaultCenter={{
      lat: 0,
      lng: 0,
    }}
    center={{
      Lat: 91,
      Lng: 181,
    }}
    searchCenter={{
      Lat: 91,
      Lng: 181,
    }}
  />,
);

const markerList = [
  {
    key: 0,
    position: {
      lat: 45.5163147,
      lng: 25.3684474,
    },
    infoContent: 'test',
  },
  {
    key: 1,
    position: {
      lat: -33.955016,
      lng: 18.424874,
    },
    infoContent: 'test',
  },
];

test('Map should render without clusters', () => {
  const map = shallow(
    <Map
      clusters={false}
      markers={[]}
      clusterImages={[]}
      defaultCenter={{
        lat: 0,
        lng: 0,
      }}
      center={{
        Lat: 90,
        Lng: 180,
      }}
      searchCenter={{
        Lat: 91,
        Lng: 181,
      }}
    />,
  );

  expect(map.length).toEqual(1);
  expect(map.find(MarkerClusterer).length).toEqual(0);
});

test('Map should render with clusters', () => {
  const map = shallow(
    <Map
      // eslint-disable-next-line react/jsx-boolean-value
      clusters={true}
      markers={[]}
      clusterImages={[]}
      defaultCenter={{
        lat: 0,
        lng: 0,
      }}
      center={{
        Lat: 91,
        Lng: 181,
      }}
      searchCenter={{
        Lat: 91,
        Lng: 181,
      }}
    />,
  );

  expect(map.length).toEqual(1);
  expect(map.find(MarkerClusterer).length).toEqual(1);
});

test('Markers should render', () => {
  const markerMap = shallowMap.instance().markers({
    onMarkerClick,
    onMarkerClose,
    current: -1,
    showCurrent: false,
    markers: markerList,
    searchCenter: {
      Lat: 91,
      Lng: 181,
    }
  });

  expect(markerMap.length).toEqual(2);
});

test('Marker should have info window', () => {
  const markerMap = shallow(
    <div>
      {
        shallowMap.instance().markers({
          onMarkerClick,
          onMarkerClose,
          current: 1,
          showCurrent: true,
          markers: markerList,
          searchCenter: {
            Lat: 91,
            Lng: 181,
          }
        })
      }
    </div>,
  );

  expect(markerMap.find(Marker).length).toEqual(2);
  expect(markerMap.find(InfoBox).length).toEqual(1);
});

test('Marker click', () => {
  const markerMap = shallow(
    <div>
      {
        shallowMap.instance().markers({
          onMarkerClick,
          onMarkerClose,
          current: 1,
          showCurrent: true,
          markers: markerList,
          searchCenter: {
            Lat: 91,
            Lng: 181,
          }
        })
      }
    </div>,
  );

  expect(markerMap.find(Marker).length).toEqual(2);
  markerMap.find(Marker).first().simulate('click');
  expect(onMarkerClick).toBeCalledWith(markerList[0]);
});

test('Marker close', () => {
  const markerMap = shallow(
    <div>
      {
        shallowMap.instance().markers({
          onMarkerClick,
          onMarkerClose,
          current: 1,
          showCurrent: true,
          markers: markerList,
          searchCenter: {
            Lat: 91,
            Lng: 181,
          }
        })
      }
    </div>,
  );

  expect(markerMap.find(Marker).length).toEqual(2);

  // expect(onMarkerClose).toBeCalledWith();

  onMarkerClose.mockClear();
  expect(onMarkerClose.mock.calls.length).toEqual(0);
  markerMap.find(InfoBox).first().simulate('closeClick');
  expect(onMarkerClose.mock.calls.length).toEqual(1);
  onMarkerClose.mockClear();
});
