import React from 'react';
import { shallow } from 'enzyme';

import Location from '../../../js/containers/list/Location';

// list of locations to use
const locations = [
  {
    ID: '1',
    Title: 'Location',
    Address: 'Address 1',
    Address2: 'Address 2',
    City: 'City',
    State: 'State',
    PostalCode: 'Zip',
    Website: 'http://example.com',
    Phone: '123-456-7777',
    Email: 'd@a.g',
    Distance: -1,
    search: '',
    current: true,
  },
  {
    ID: '2',
    Title: 'Location',
    Address: 'Address 1',
    Address2: 'Address 2',
    City: 'City',
    State: 'State',
    PostalCode: 'Zip',
    Website: 'http://example.com',
    Phone: '123-456-7777',
    Email: 'd@a.g',
    Distance: 10,
    search: 'AAA',
    current: false,
  },
  {
    ID: '2',
    Title: 'Location',
    Website: 'http://example.com',
    Phone: '123-456-7777',
    Email: 'd@a.g',
    Distance: 10,
    search: 'AAA',
    current: false,
  },
];

// unit of measure
const unit = 'm';

// a mock function for onClick
const mockOnClick = jest.fn();

// creates shallow renders of all the locations in the list
const locationComponents = locations.map(
  (loc, index) =>
    shallow(
      <Location
        location={locations[index]}
        index={index}
        unit={unit}
        onClick={mockOnClick}
        style={{
          backgroundColor: 'white',
        }}
        current={loc.current}
        search={loc.search}
      />,
    ),
);

test('Location component should render', () => {
  expect(locationComponents[0].length).toEqual(1);
});

test('Location\'s onClick call', () => {
  locationComponents[0].simulate('click');
  expect(mockOnClick).toBeCalledWith('1');
});
