import { afterEach } from '@jest/globals';
import { act } from '@testing-library/react';

import { NotificationAcknowledger } from './NotificationAcknowledger';
import { createStore } from '../../../store';
import {
  getMockSnap,
  getRequestMethodMock,
  render,
} from '../../../utils/test-utils';
import { getAcknowledgedUpdates } from '../store';

describe('NotificationAcknowledger', () => {
  afterEach(() => {
    // eslint-disable-next-line no-restricted-globals
    localStorage.clear();
  });

  it('acknowledges the given snap ID and version', async () => {
    const { snap } = getMockSnap();
    Object.assign(globalThis, 'window', {
      ethereum: getRequestMethodMock({
        /* eslint-disable @typescript-eslint/naming-convention */
        wallet_getSnaps: {
          [snap.snapId]: {
            name: snap.name,
            version: '0.1.0',
          },
        },
        web3_clientVersion: 'MetaMask/v11.0.0',
        /* eslint-enable @typescript-eslint/naming-convention */
      }),
    });

    const store = createStore({
      snaps: {
        snaps: [snap],
      },
    });

    await act(() =>
      render(
        <NotificationAcknowledger
          snapId={snap.snapId}
          version={snap.latestVersion}
        />,
        store,
      ),
    );

    expect(getAcknowledgedUpdates(store.getState())).toStrictEqual([
      { snapId: 'snap-id', version: '1.0.0' },
    ]);
  });

  it('does not acknowledge the given snap ID and version if the update is not available', async () => {
    const { snap } = getMockSnap({ latestVersion: '0.1.0' });
    Object.assign(globalThis, 'window', {
      ethereum: getRequestMethodMock({
        /* eslint-disable @typescript-eslint/naming-convention */
        wallet_getSnaps: {
          [snap.snapId]: {
            name: snap.name,
            version: '0.1.0',
          },
        },
        web3_clientVersion: 'MetaMask/v11.0.0',
        /* eslint-enable @typescript-eslint/naming-convention */
      }),
    });

    const store = createStore({
      snaps: {
        snaps: [snap],
      },
    });

    await act(() =>
      render(
        <NotificationAcknowledger
          snapId={snap.snapId}
          version={snap.latestVersion}
        />,
        store,
      ),
    );

    expect(getAcknowledgedUpdates(store.getState())).toStrictEqual([]);
  });

  it('does not acknowledge the given snap ID and version if the update is already acknowledged', async () => {
    const { snap } = getMockSnap();
    Object.assign(globalThis, 'window', {
      ethereum: getRequestMethodMock({
        /* eslint-disable @typescript-eslint/naming-convention */
        wallet_getSnaps: {
          [snap.snapId]: {
            name: snap.name,
            version: '0.1.0',
          },
        },
        web3_clientVersion: 'MetaMask/v11.0.0',
        /* eslint-enable @typescript-eslint/naming-convention */
      }),
    });

    const store = createStore({
      snaps: {
        snaps: [snap],
      },
      notifications: {
        acknowledgedUpdates: [{ snapId: 'snap-id', version: '1.0.0' }],
      },
    });

    await act(() =>
      render(
        <NotificationAcknowledger
          snapId={snap.snapId}
          version={snap.latestVersion}
        />,
        store,
      ),
    );

    expect(getAcknowledgedUpdates(store.getState())).toStrictEqual([
      { snapId: snap.snapId, version: snap.latestVersion },
    ]);
  });
});
