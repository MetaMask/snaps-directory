import { beforeEach } from '@jest/globals';
import { act } from 'react-dom/test-utils';

import {
  getInstalledSnap,
  getInstalledSnaps,
  useGetInstalledSnapsQuery,
  useGetVersionQuery,
  useInstallSnapMutation,
} from './api';
import * as analytics from '../../analytics';
import { SnapEventType } from '../../analytics';
import { createStore } from '../../store';
import {
  getMockQueryResponse,
  getMockSnap,
  getMockState,
  getRequestMethodMock,
  renderHook,
} from '../../utils/test-utils';

describe('snapsApi', () => {
  beforeEach(() => {
    jest.spyOn(analytics, 'track').mockImplementation();
  });

  describe('getVersion', () => {
    it('returns the version', async () => {
      Object.assign(globalThis, 'window', {
        ethereum: getRequestMethodMock({
          /* eslint-disable @typescript-eslint/naming-convention */
          web3_clientVersion: 'MetaMask/v1.2.3',
          /* eslint-enable @typescript-eslint/naming-convention */
        }),
      });

      const { result } = await act(() =>
        renderHook(() => useGetVersionQuery()),
      );

      expect(result.current.data).toBe('MetaMask/v1.2.3');
    });
  });

  describe('getInstalledSnaps', () => {
    it('returns the installed snaps', async () => {
      const { snap } = getMockSnap();
      Object.assign(globalThis, 'window', {
        ethereum: getRequestMethodMock({
          /* eslint-disable @typescript-eslint/naming-convention */
          wallet_getSnaps: {
            [snap.snapId]: {
              version: snap.latestVersion,
            },
          },
          /* eslint-enable @typescript-eslint/naming-convention */
        }),
      });

      const { result } = await act(() =>
        renderHook(() => useGetInstalledSnapsQuery()),
      );

      expect(result.current.data).toStrictEqual({
        [snap.snapId]: {
          version: snap.latestVersion,
        },
      });
    });
  });

  describe('installSnap', () => {
    it('installs the snap', async () => {
      const { snap } = getMockSnap();
      Object.assign(globalThis, 'window', {
        ethereum: getRequestMethodMock({
          /* eslint-disable @typescript-eslint/naming-convention */
          wallet_requestSnaps: {
            [snap.snapId]: {
              error: null,
            },
          },
          /* eslint-enable @typescript-eslint/naming-convention */
        }),
      });

      const { result } = await act(() =>
        renderHook(() => useInstallSnapMutation()),
      );

      const [installSnap] = result.current;
      await act(
        async () =>
          await installSnap({
            snapId: snap.snapId,
            version: snap.latestVersion,
          }),
      );

      const [, { data }] = result.current;
      expect(data).toStrictEqual({
        [snap.snapId]: {
          error: null,
        },
      });
    });

    it('handles error responses', async () => {
      const { snap } = getMockSnap();
      Object.assign(globalThis, 'window', {
        ethereum: getRequestMethodMock({
          /* eslint-disable @typescript-eslint/naming-convention */
          wallet_requestSnaps: {
            [snap.snapId]: {
              error: 'Install failed.',
            },
          },
          /* eslint-enable @typescript-eslint/naming-convention */
        }),
      });

      const { result } = await act(() =>
        renderHook(() => useInstallSnapMutation()),
      );

      const [installSnap] = result.current;
      await act(
        async () =>
          await installSnap({
            snapId: snap.snapId,
            version: snap.latestVersion,
          }),
      );

      const [, { error }] = result.current;
      expect(error).toStrictEqual({
        name: 'Error',
        message: 'Failed to install snap: Install failed.',
        stack: expect.any(String),
      });
    });

    it('handles errors', async () => {
      const { snap } = getMockSnap();
      Object.assign(globalThis, 'window', {
        ethereum: getRequestMethodMock({
          /* eslint-disable @typescript-eslint/naming-convention */
          wallet_requestSnaps: new Error('Failed to install snap.'),
          /* eslint-enable @typescript-eslint/naming-convention */
        }),
      });

      const { result } = await act(() =>
        renderHook(() => useInstallSnapMutation()),
      );

      const [installSnap] = result.current;
      await act(
        async () =>
          await installSnap({
            snapId: snap.snapId,
            version: snap.latestVersion,
          }),
      );

      const [, { error }] = result.current;
      expect(error).toStrictEqual(new Error('Failed to install snap.'));
    });

    it('tracks the install event', async () => {
      const { snap } = getMockSnap();
      Object.assign(globalThis, 'window', {
        ethereum: getRequestMethodMock({
          /* eslint-disable @typescript-eslint/naming-convention */
          wallet_requestSnaps: {
            [snap.snapId]: {
              error: null,
            },
          },
          /* eslint-enable @typescript-eslint/naming-convention */
        }),
      });

      const spy = jest.spyOn(analytics, 'track').mockImplementation();
      const { result } = await act(() =>
        renderHook(() => useInstallSnapMutation()),
      );

      const [installSnap] = result.current;
      await act(
        async () =>
          await installSnap({
            snapId: snap.snapId,
            version: snap.latestVersion,
          }),
      );

      expect(spy).toHaveBeenCalledWith({
        type: SnapEventType.Install,
        snapId: snap.snapId,
        version: snap.latestVersion,
      });

      expect(spy).toHaveBeenCalledWith({
        type: SnapEventType.Installed,
        snapId: snap.snapId,
        version: snap.latestVersion,
      });
    });

    it('tracks the installation failed event for errors in the response', async () => {
      const { snap } = getMockSnap();
      Object.assign(globalThis, 'window', {
        ethereum: getRequestMethodMock({
          /* eslint-disable @typescript-eslint/naming-convention */
          wallet_requestSnaps: {
            [snap.snapId]: {
              error: 'Install failed.',
            },
          },
          /* eslint-enable @typescript-eslint/naming-convention */
        }),
      });

      const spy = jest.spyOn(analytics, 'track').mockImplementation();
      const { result } = await act(() =>
        renderHook(() => useInstallSnapMutation()),
      );

      const [installSnap] = result.current;
      await act(
        async () =>
          await installSnap({
            snapId: snap.snapId,
            version: snap.latestVersion,
          }),
      );

      expect(spy).toHaveBeenCalledWith({
        type: SnapEventType.Install,
        snapId: snap.snapId,
        version: snap.latestVersion,
      });

      expect(spy).toHaveBeenCalledWith({
        type: SnapEventType.InstallationFailed,
        snapId: snap.snapId,
        version: snap.latestVersion,
        error: 'Install failed.',
      });
    });

    it('tracks the installation failed event for request errors', async () => {
      const { snap } = getMockSnap();
      Object.assign(globalThis, 'window', {
        ethereum: getRequestMethodMock({
          /* eslint-disable @typescript-eslint/naming-convention */
          wallet_requestSnaps: new Error('Install failed.'),
          /* eslint-enable @typescript-eslint/naming-convention */
        }),
      });

      const spy = jest.spyOn(analytics, 'track').mockImplementation();
      const { result } = await act(() =>
        renderHook(() => useInstallSnapMutation()),
      );

      const [installSnap] = result.current;
      await act(
        async () =>
          await installSnap({
            snapId: snap.snapId,
            version: snap.latestVersion,
          }),
      );

      expect(spy).toHaveBeenCalledWith({
        type: SnapEventType.Install,
        snapId: snap.snapId,
        version: snap.latestVersion,
      });

      expect(spy).toHaveBeenCalledWith({
        type: SnapEventType.InstallationFailed,
        snapId: snap.snapId,
        version: snap.latestVersion,
        error: 'Install failed.',
      });
    });

    it('tracks the installation rejected event', async () => {
      const { snap } = getMockSnap();
      Object.assign(globalThis, 'window', {
        ethereum: getRequestMethodMock({
          /* eslint-disable @typescript-eslint/naming-convention */
          wallet_requestSnaps: new Error('User rejected the request.'),
          /* eslint-enable @typescript-eslint/naming-convention */
        }),
      });

      const spy = jest.spyOn(analytics, 'track').mockImplementation();
      const { result } = await act(() =>
        renderHook(() => useInstallSnapMutation()),
      );

      const [installSnap] = result.current;
      await act(
        async () =>
          await installSnap({
            snapId: snap.snapId,
            version: snap.latestVersion,
          }),
      );

      expect(spy).toHaveBeenCalledWith({
        type: SnapEventType.Install,
        snapId: snap.snapId,
        version: snap.latestVersion,
      });

      expect(spy).toHaveBeenCalledWith({
        type: SnapEventType.InstallationRejected,
        snapId: snap.snapId,
        version: snap.latestVersion,
      });
    });

    it('tracks the update event', async () => {
      const { snap } = getMockSnap({ latestVersion: '1.1.0' });
      Object.assign(globalThis, 'window', {
        ethereum: getRequestMethodMock({
          /* eslint-disable @typescript-eslint/naming-convention */
          wallet_getSnaps: {
            [snap.snapId]: {
              version: '1.0.0',
            },
          },
          wallet_requestSnaps: {
            [snap.snapId]: {
              error: null,
            },
          },
          /* eslint-enable @typescript-eslint/naming-convention */
        }),
      });

      const store = createStore({
        snaps: {
          snaps: [snap],
        },
      });

      const spy = jest.spyOn(analytics, 'track').mockImplementation();
      const { result } = await act(() =>
        renderHook(() => useInstallSnapMutation(), store),
      );

      const [installSnap] = result.current;
      await act(
        async () =>
          await installSnap({
            snapId: snap.snapId,
            version: snap.latestVersion,
          }),
      );

      expect(spy).toHaveBeenCalledWith({
        type: SnapEventType.Update,
        snapId: snap.snapId,
        oldVersion: '1.0.0',
        newVersion: '1.1.0',
      });

      expect(spy).toHaveBeenCalledWith({
        type: SnapEventType.Installed,
        snapId: snap.snapId,
        version: snap.latestVersion,
      });
    });
  });

  describe('selectors', () => {
    describe('getInstalledSnaps', () => {
      it('selects the installed Snaps', () => {
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

    describe('getInstalledSnap', () => {
      it('selects the installed Snap', () => {
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

        expect(getInstalledSnap(snap.snapId)(state)).toStrictEqual({
          version: snap.latestVersion,
        });
      });

      it('returns null if the Snap is not installed', () => {
        const state = getMockState({
          snapsApi: {
            queries: {
              'getInstalledSnaps(undefined)': getMockQueryResponse({}),
            },
          },
        });

        expect(getInstalledSnap('foo-snap')(state)).toBeNull();
      });
    });
  });
});
