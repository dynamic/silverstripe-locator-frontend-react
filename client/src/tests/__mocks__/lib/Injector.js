module.exports = {
  loadComponent: jest.fn((className) => className),
  component: {
    register: jest.fn(),
  },
};
