import React from 'react';
import { shallow } from 'enzyme';

import Pagination from '../../../js/components/list/Pagination';

const goToPage = jest.fn();

/**
 * Tests to see if the component renders without erroring
 */
test('Pagination component should render', () => {
  const pagination = shallow(
    <Pagination
      page={1}
      count={20}
      defaultLimit={10}
      goToPage={goToPage}
    />,
  );
  expect(pagination.length).toEqual(1);
});

/**
 * Tests to see if the component does not render when there are no pages
 */
test('Pagination component should not render', () => {
  const pagination = shallow(
    <Pagination
      page={1}
      count={20}
      defaultLimit={25}
      goToPage={goToPage}
    />,
  );
  expect(pagination.length).toEqual(1);
});

/**
 * Tests to see if the component calculates the correct amount of pages
 */
test('Pagination component should have the right amount of pages', () => {
  let pagination = shallow(
    <Pagination
      page={1}
      count={20}
      defaultLimit={25}
      goToPage={goToPage}
    />,
  );
  expect(pagination.instance().getLastPage()).toEqual(1);

  pagination = shallow(
    <Pagination
      page={2}
      count={13}
      defaultLimit={5}
      goToPage={goToPage}
    />,
  );
  expect(pagination.instance().getLastPage()).toEqual(3);
});

/**
 * Tests to see if the component calculates the right page numbers
 */
test('Pagination component should have the right page numbers', () => {
  let pagination = shallow(
    <Pagination
      page={2}
      count={13}
      defaultLimit={5}
      goToPage={goToPage}
    />,
  );
  expect(pagination.instance().getPageNumbers()).toEqual([1, 2, 3]);

  pagination = shallow(
    <Pagination
      page={6}
      count={13}
      defaultLimit={1}
      goToPage={goToPage}
    />,
  );
  expect(pagination.instance().getPageNumbers()).toEqual([4, 5, 6, 7, 8]);

  pagination = shallow(
    <Pagination
      page={13}
      count={13}
      defaultLimit={1}
      goToPage={goToPage}
    />,
  );
  expect(pagination.instance().getPageNumbers()).toEqual([9, 10, 11, 12, 13]);
});
