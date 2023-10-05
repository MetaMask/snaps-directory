import { afterEach } from '@jest/globals';

import { createStore } from './store';
import { acknowledgeUpdate } from '../features';

describe('createStore', () => {
  afterEach(() => {
    // eslint-disable-next-line no-restricted-globals
    localStorage.clear();
  });

  it('creates a Redux store', () => {
    expect(createStore()).toBeDefined();
  });

  it('writes the notifications state to localStorage', () => {
    const store = createStore();

    // eslint-disable-next-line no-restricted-globals
    expect(localStorage.getItem('notifications')).toBeNull();

    store.dispatch(
      acknowledgeUpdate({
        snapId: 'test',
        version: '1.0.0',
      }),
    );

    // eslint-disable-next-line no-restricted-globals
    expect(localStorage.getItem('notifications')).toBe(
      JSON.stringify({
        acknowledgedUpdates: [
          {
            snapId: 'test',
            version: '1.0.0',
          },
        ],
      }),
    );
  });

  it('does not write the notifications state to localStorage if localStorage is not available', () => {
    const store = createStore();
    const { localStorage } = globalThis;

    // @ts-expect-error - We're trying to test the case where localStorage is
    // not available, so we delete it from the global object.
    delete globalThis.localStorage;

    store.dispatch(
      acknowledgeUpdate({
        snapId: 'test',
        version: '1.0.0',
      }),
    );

    expect(localStorage.getItem('notifications')).toBeNull();

    globalThis.localStorage = localStorage;
  });
});
