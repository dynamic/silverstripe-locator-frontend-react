import React from 'react';
import { shallow } from 'enzyme';

import PaginationEnd from '../../../js/components/list/PaginationEnd';

const click = jest.fn();

/**
 * Tests to see if the component renders without erroring
 */
test('PaginationEnd component should render', () => {
  const paginationEnd = shallow(
    <PaginationEnd
      text="Text"
      label="Label"
      classes=""
      action={click}
    />,
  );
  expect(paginationEnd.length).toEqual(1);
});
