import { beforeEach } from '@jest/globals';
import { act } from '@testing-library/react';

import { InstallSnapButton } from './InstallSnapButton';
import * as analytics from '../analytics';
import { setSnaps } from '../features';
import { createStore } from '../store';
import { getMockSnap, getRequestMethodMock, render } from '../utils/test-utils';

describe('InstallSnapButton', () => {
  beforeEach(() => {
    jest.spyOn(analytics, 'track').mockImplementation();
  });

  it('renders', async () => {
    Object.assign(globalThis, 'window', {
      ethereum: getRequestMethodMock({
        /* eslint-disable @typescript-eslint/naming-convention */
        wallet_getSnaps: {},
        web3_clientVersion: 'MetaMask/v11.0.0',
        /* eslint-enable @typescript-eslint/naming-convention */
      }),
    });

    const { snap } = getMockSnap();
    const { queryByText, queryByTestId } = await act(() =>
      render(<InstallSnapButton {...snap} version={snap.latestVersion} />),
    );

    expect(queryByText('Add to MetaMask')).toBeInTheDocument();
    expect(queryByTestId('install-unsupported-button')).not.toBeInTheDocument();
  });

  it('renders the unsupported button if Snaps are not supported', async () => {
    Object.assign(globalThis, 'window', {
      ethereum: getRequestMethodMock({
        /* eslint-disable @typescript-eslint/naming-convention */
        wallet_getSnaps: new Error('Snaps are not supported.'),
        web3_clientVersion: 'MetaMask/v10.0.0',
        /* eslint-enable @typescript-eslint/naming-convention */
      }),
    });

    const { snap } = getMockSnap();
    const { queryByText, queryByTestId } = await act(() =>
      render(<InstallSnapButton {...snap} version={snap.latestVersion} />),
    );

    expect(queryByText('Add to MetaMask')).toBeInTheDocument();
    expect(queryByTestId('install-unsupported-button')).toBeInTheDocument();
  });

  it('installs the Snap and shows the post-installation modal', async () => {
    const { snap } = getMockSnap();
    Object.assign(globalThis, 'window', {
      ethereum: getRequestMethodMock({
        /* eslint-disable @typescript-eslint/naming-convention */
        wallet_getSnaps: {},
        web3_clientVersion: 'MetaMask/v11.0.0',
        wallet_requestSnaps: {
          [snap.snapId]: {
            name: snap.name,
          },
        },
        /* eslint-enable @typescript-eslint/naming-convention */
      }),
    });

    const { getByText, queryByText } = await act(() =>
      render(<InstallSnapButton {...snap} version={snap.latestVersion} />),
    );

    const button = getByText('Add to MetaMask');
    await act(async () => act(() => button.click()));

    // eslint-disable-next-line @typescript-eslint/unbound-method, no-restricted-globals
    expect(window.ethereum.request).toHaveBeenCalledWith({
      method: 'wallet_requestSnaps',
      params: {
        [snap.snapId]: {
          version: snap.latestVersion,
        },
      },
    });

    expect(queryByText('Installed')).toBeInTheDocument();
  });

  it('does not show the modal if the installation failed', async () => {
    const { snap } = getMockSnap();
    Object.assign(globalThis, 'window', {
      ethereum: getRequestMethodMock({
        /* eslint-disable @typescript-eslint/naming-convention */
        wallet_getSnaps: {},
        web3_clientVersion: 'MetaMask/v11.0.0',
        wallet_requestSnaps: new Error('User rejected the request.'),
        /* eslint-enable @typescript-eslint/naming-convention */
      }),
    });

    const { getByText, queryByText } = await act(() =>
      render(<InstallSnapButton {...snap} version={snap.latestVersion} />),
    );

    const button = getByText('Add to MetaMask');
    await act(async () => act(() => button.click()));

    // eslint-disable-next-line @typescript-eslint/unbound-method, no-restricted-globals
    expect(window.ethereum.request).toHaveBeenCalledWith({
      method: 'wallet_requestSnaps',
      params: {
        [snap.snapId]: {
          version: snap.latestVersion,
        },
      },
    });

    expect(queryByText('Installation complete')).not.toBeInTheDocument();
  });

  it('shows an update button if there is an update available', async () => {
    const { snap } = getMockSnap({ latestVersion: '1.0.0' });
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

    const store = createStore();
    store.dispatch(setSnaps([snap]));

    const { queryByText } = await act(() =>
      render(
        <InstallSnapButton {...snap} version={snap.latestVersion} />,
        store,
      ),
    );

    expect(queryByText('Update Snap')).toBeInTheDocument();
    expect(queryByText('Add to MetaMask')).not.toBeInTheDocument();
  });

  it('shows an installed button if the Snap is installed', async () => {
    const { snap } = getMockSnap();
    Object.assign(globalThis, 'window', {
      ethereum: getRequestMethodMock({
        /* eslint-disable @typescript-eslint/naming-convention */
        wallet_getSnaps: {
          [snap.snapId]: {
            name: snap.name,
            version: snap.latestVersion,
          },
        },
        web3_clientVersion: 'MetaMask/v11.0.0',
        /* eslint-enable @typescript-eslint/naming-convention */
      }),
    });

    const store = createStore();
    store.dispatch(setSnaps([snap]));

    const { queryByText } = await act(() =>
      render(
        <InstallSnapButton {...snap} version={snap.latestVersion} />,
        store,
      ),
    );

    expect(queryByText('Installed')).toBeInTheDocument();
    expect(queryByText('Add to MetaMask')).not.toBeInTheDocument();
  });
});
