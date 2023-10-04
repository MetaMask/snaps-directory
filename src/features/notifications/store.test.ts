import { afterEach } from '@jest/globals';

import {
  acknowledgeUpdate,
  getAcknowledgedUpdates,
  getUnacknowledgedUpdates,
  isUpdateAcknowledged,
  notificationsSlice,
  removeAcknowledgedUpdate,
} from './store';
import {
  getMockQueryResponse,
  getMockSnap,
  getMockState,
} from '../../utils/test-utils';

describe('notificationsSlice', () => {
  describe('initialState', () => {
    afterEach(() => {
      // eslint-disable-next-line no-restricted-globals
      localStorage.clear();
    });

    it('gets the initial state from localStorage', () => {
      // eslint-disable-next-line no-restricted-globals
      localStorage.setItem(
        'notifications',
        JSON.stringify({
          acknowledgedUpdates: [
            {
              snapId: 'test-snap',
              version: '1.0.0',
            },
          ],
        }),
      );

      const state = notificationsSlice.reducer(undefined, { type: 'foo' });
      expect(state).toStrictEqual({
        acknowledgedUpdates: [
          {
            snapId: 'test-snap',
            version: '1.0.0',
          },
        ],
      });
    });

    it('returns the default state if localStorage is empty', () => {
      const state = notificationsSlice.reducer(undefined, { type: 'foo' });
      expect(state).toStrictEqual({
        acknowledgedUpdates: [],
      });
    });

    it('returns the default state if localStorage is not available', () => {
      const { localStorage } = globalThis;

      // eslint-disable-next-line no-restricted-globals
      // @ts-expect-error - Intentionally deleting `localStorage` for testing.
      delete globalThis.localStorage;

      const state = notificationsSlice.reducer(undefined, { type: 'foo' });
      expect(state).toStrictEqual({
        acknowledgedUpdates: [],
      });

      globalThis.localStorage = localStorage;
    });
  });

  describe('acknowledgeUpdate', () => {
    it('adds an update to the list of acknowledged updates', () => {
      const state = notificationsSlice.reducer(
        undefined,
        acknowledgeUpdate({
          snapId: 'test-snap',
          version: '1.0.0',
        }),
      );

      expect(state.acknowledgedUpdates).toStrictEqual([
        {
          snapId: 'test-snap',
          version: '1.0.0',
        },
      ]);
    });
  });

  describe('removeAcknowledgedUpdate', () => {
    it('removes an update from the list of acknowledged updates', () => {
      const state = notificationsSlice.reducer(
        {
          acknowledgedUpdates: [
            {
              snapId: 'test-snap',
              version: '1.0.0',
            },
          ],
        },
        removeAcknowledgedUpdate('test-snap'),
      );

      expect(state.acknowledgedUpdates).toStrictEqual([]);
    });
  });

  describe('selectors', () => {
    describe('getAcknowledgedUpdates', () => {
      it('returns the list of acknowledged updates', () => {
        const state = getMockState({
          notifications: {
            acknowledgedUpdates: [
              {
                snapId: 'test-snap',
                version: '1.0.0',
              },
            ],
          },
        });

        expect(getAcknowledgedUpdates(state)).toStrictEqual([
          {
            snapId: 'test-snap',
            version: '1.0.0',
          },
        ]);
      });
    });

    describe('isUpdateAcknowledged', () => {
      it('returns `true` if the update is acknowledged', () => {
        const state = getMockState({
          notifications: {
            acknowledgedUpdates: [
              {
                snapId: 'test-snap',
                version: '1.0.0',
              },
            ],
          },
        });

        expect(isUpdateAcknowledged('test-snap', '1.0.0')(state)).toBe(true);
      });

      it('returns `false` if the update is not acknowledged', () => {
        const state = getMockState({
          notifications: {
            acknowledgedUpdates: [
              {
                snapId: 'test-snap',
                version: '1.0.0',
              },
            ],
          },
        });

        expect(isUpdateAcknowledged('test-snap', '1.0.1')(state)).toBe(false);
      });
    });
  });

  describe('getUnacknowledgedUpdates', () => {
    it('returns the list of unacknowledged updates', () => {
      const { snap } = getMockSnap({
        snapId: 'test-snap',
        latestVersion: '1.0.1',
      });

      const state = getMockState({
        notifications: {
          acknowledgedUpdates: [],
        },
        snaps: {
          snaps: [snap],
        },
        snapsApi: {
          queries: {
            'getInstalledSnaps(undefined)': getMockQueryResponse({
              [snap.snapId]: {
                version: '1.0.0',
              },
            }),
          },
        },
      });

      expect(getUnacknowledgedUpdates(state)).toStrictEqual([snap]);
    });

    it('does not return updates that are already acknowledged', () => {
      const { snap } = getMockSnap({
        snapId: 'test-snap',
        latestVersion: '1.0.1',
      });

      const state = getMockState({
        notifications: {
          acknowledgedUpdates: [
            {
              snapId: snap.snapId,
              version: snap.latestVersion,
            },
          ],
        },
        snaps: {
          snaps: [snap],
        },
        snapsApi: {
          queries: {
            'getInstalledSnaps(undefined)': getMockQueryResponse({
              [snap.snapId]: {
                version: '1.0.0',
              },
            }),
          },
        },
      });

      expect(getUnacknowledgedUpdates(state)).toStrictEqual([]);
    });

    it('does not return updates that are not installed', () => {
      const { snap } = getMockSnap({
        snapId: 'test-snap',
        latestVersion: '1.0.1',
      });

      const state = getMockState({
        notifications: {
          acknowledgedUpdates: [],
        },
        snaps: {
          snaps: [snap],
        },
        snapsApi: {
          queries: {
            'getInstalledSnaps(undefined)': getMockQueryResponse({}),
          },
        },
      });

      expect(getUnacknowledgedUpdates(state)).toStrictEqual([]);
    });
  });
});
