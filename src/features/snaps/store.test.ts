import {
  getInstalledSnaps,
  getSnaps,
  getUpdateAvailable,
  setSnaps,
  snapsSlice,
} from './store';
import {
  getMockQueryResponse,
  getMockSnap,
  getMockState,
} from '../../utils/test-utils';

describe('snapsSlice', () => {
  describe('setSnaps', () => {
    it('sets the Snaps', () => {
      const state = snapsSlice.reducer(
        snapsSlice.getInitialState(),
        setSnaps([getMockSnap().snap]),
      );

      expect(state).toStrictEqual({
        snaps: [getMockSnap().snap],
      });
    });
  });

  describe('getSnaps', () => {
    it('selects the snaps', () => {
      const state = getMockState({
        snaps: {
          snaps: [getMockSnap().snap],
        },
      });

      expect(getSnaps(state)).toStrictEqual([getMockSnap().snap]);
    });
  });

  describe('getInstalledSnaps', () => {
    it('selects the installed snaps', () => {
      const { snap } = getMockSnap();
      const state = getMockState({
        snapsApi: {
          queries: {
            'getInstalledSnaps(undefined)': getMockQueryResponse({
              [snap.snapId]: {
                version: snap.latestVersion,
              },
            }),
          },
        },
      });

      expect(getInstalledSnaps(state)).toStrictEqual({
        [snap.snapId]: {
          version: snap.latestVersion,
        },
      });
    });
  });

  describe('getUpdateAvailable', () => {
    it('returns `false` if the snap is not installed', () => {
      const state = getMockState({
        snaps: {
          snaps: [getMockSnap().snap],
        },
        snapsApi: {
          queries: {
            'getInstalledSnaps(undefined)': getMockQueryResponse({}),
          },
        },
      });

      expect(getUpdateAvailable('snap-id')(state)).toBe(false);
    });

    it('returns `false` if the snap is installed but not in the store', () => {
      const state = getMockState({
        snaps: {
          snaps: [],
        },
        snapsApi: {
          queries: {
            'getInstalledSnaps(undefined)': getMockQueryResponse({
              'snap-id': {
                version: '1.0.0',
              },
            }),
          },
        },
      });

      expect(getUpdateAvailable('snap-id')(state)).toBe(false);
    });

    it('returns `false` if the snap is installed but the version is the same', () => {
      const { snap } = getMockSnap();
      const state = getMockState({
        snaps: {
          snaps: [snap],
        },
        snapsApi: {
          queries: {
            'getInstalledSnaps(undefined)': getMockQueryResponse({
              [snap.snapId]: {
                version: snap.latestVersion,
              },
            }),
          },
        },
      });

      expect(getUpdateAvailable(snap.snapId)(state)).toBe(false);
    });

    it('returns `false` if the snap is installed and the latest version is lower', () => {
      const { snap } = getMockSnap({ latestVersion: '1.0.0' });
      const state = getMockState({
        snaps: {
          snaps: [snap],
        },
        snapsApi: {
          queries: {
            'getInstalledSnaps(undefined)': getMockQueryResponse({
              [snap.snapId]: {
                version: '1.1.0',
              },
            }),
          },
        },
      });

      expect(getUpdateAvailable(snap.snapId)(state)).toBe(false);
    });

    it('returns `true` if the snap is installed and the latest version is higher', () => {
      const { snap } = getMockSnap({ latestVersion: '1.1.0' });
      const state = getMockState({
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

      expect(getUpdateAvailable(snap.snapId)(state)).toBe(true);
    });
  });
});
