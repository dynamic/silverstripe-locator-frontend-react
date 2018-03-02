/* eslint-disable import/no-extraneous-dependencies */
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

// sets the localization method
global.ss = {
  i18n: {
    _t: jest.fn((entity, fallback) => fallback),
  },
};
