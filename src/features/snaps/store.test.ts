import {
  getSnaps,
  getSnapsById,
  getUpdatableSnaps,
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

  describe('getSnapsById', () => {
    it('returns the filtered snaps in the requested order', () => {
      const mockSnaps = [
        getMockSnap({ snapId: 'npm:snap1' }).snap,
        getMockSnap({ snapId: 'npm:snap2' }).snap,
        getMockSnap({ snapId: 'npm:snap3' }).snap,
      ];
      const state = getMockState({
        snaps: {
          snaps: mockSnaps,
        },
      });

      expect(getSnapsById(['npm:snap3', 'npm:snap2'])(state)).toStrictEqual([
        mockSnaps[2],
        mockSnaps[1],
      ]);
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
            'getAllInstalledSnaps(undefined)': getMockQueryResponse({}),
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
            'getAllInstalledSnaps(undefined)': getMockQueryResponse({
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
            'getAllInstalledSnaps(undefined)': getMockQueryResponse({
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
            'getAllInstalledSnaps(undefined)': getMockQueryResponse({
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
            'getAllInstalledSnaps(undefined)': getMockQueryResponse({
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

  describe('getUpdatableSnaps', () => {
    it('returns all Snaps that have an update available', () => {
      const fooSnap = getMockSnap({ snapId: 'foo-snap' }).snap;
      const barSnap = getMockSnap({ snapId: 'bar-snap' }).snap;

      const state = getMockState({
        snaps: {
          snaps: [fooSnap, barSnap],
        },
        snapsApi: {
          queries: {
            'getAllInstalledSnaps(undefined)': getMockQueryResponse({
              [barSnap.snapId]: {
                version: '0.1.0',
              },
            }),
          },
        },
      });

      expect(getUpdatableSnaps(state)).toStrictEqual([barSnap]);
    });
  });
});
