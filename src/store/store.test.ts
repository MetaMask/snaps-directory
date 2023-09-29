import { createStore } from './store';

describe('createStore', () => {
  it('creates a Redux store', () => {
    expect(createStore()).toBeDefined();
  });
});
