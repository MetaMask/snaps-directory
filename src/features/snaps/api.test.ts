import { act } from 'react-dom/test-utils';

import {
  useGetInstalledSnapsQuery,
  useGetVersionQuery,
  useInstallSnapMutation,
} from './api';
import {
  getMockSnap,
  getRequestMethodMock,
  renderHook,
} from '../../utils/test-utils';

describe('snapsApi', () => {
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
              version: [snap.latestVersion],
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
          version: [snap.latestVersion],
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
  });
});
