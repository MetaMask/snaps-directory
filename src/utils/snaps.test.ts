import { describe, it, expect, beforeEach } from '@jest/globals';

import type { VerifiedSnap } from './snaps';
import {
  getLatestSnapVersion,
  getMetaMaskProvider,
  getSnapsProvider,
  hasSnapsSupport,
  isMetaMaskProvider,
} from './snaps';
import { getRequestMethodMock } from './test-utils';

describe('hasSnapsSupport', () => {
  it('returns `true` if the provider supports Snaps', async () => {
    const provider = getRequestMethodMock({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      wallet_getSnaps: {},
    });

    expect(await hasSnapsSupport(provider)).toBe(true);
  });

  it('returns `false` if the provider does not support Snaps', async () => {
    const provider = getRequestMethodMock({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      wallet_getSnaps: new Error('Unsupported method.'),
    });

    expect(await hasSnapsSupport(provider)).toBe(false);
  });
});

describe('isMetaMaskProvider', () => {
  it('returns `true` if the provider is MetaMask', async () => {
    const provider = getRequestMethodMock({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      web3_clientVersion: 'MetaMask/11.0.0',
    });

    expect(await isMetaMaskProvider(provider)).toBe(true);
  });

  it('returns `false` if the provider is not MetaMask', async () => {
    const provider = getRequestMethodMock({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      web3_clientVersion: 'Foo/11.0.0',
    });

    expect(await isMetaMaskProvider(provider)).toBe(false);
  });

  it('returns `false` if the provider throws', async () => {
    const provider = getRequestMethodMock({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      web3_clientVersion: new Error('Unsupported method.'),
    });

    expect(await isMetaMaskProvider(provider)).toBe(false);
  });
});

describe('getMetaMaskProvider', () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, 'window', {
      writable: true,
      value: undefined,
    });
  });

  it('returns `null` if `window` is undefined', async () => {
    expect(await getMetaMaskProvider()).toBeNull();
  });

  it('returns `null` if no provider is detected', async () => {
    Object.defineProperty(globalThis, 'window', {
      writable: true,
      value: {
        ethereum: undefined,
      },
    });

    expect(await getMetaMaskProvider()).toBeNull();
  });

  it('returns the provider if it is MetaMask', async () => {
    Object.defineProperty(globalThis, 'window', {
      writable: true,
      value: {
        ethereum: getRequestMethodMock({
          // eslint-disable-next-line @typescript-eslint/naming-convention
          web3_clientVersion: 'MetaMask/11.0.0',
        }),
      },
    });

    expect(await getMetaMaskProvider()).not.toBeNull();
  });

  it('returns the provider if it is in the `window.ethereum.detected` array', async () => {
    const provider = getRequestMethodMock({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      web3_clientVersion: 'MetaMask/11.0.0',
    });

    Object.defineProperty(globalThis, 'window', {
      writable: true,
      value: {
        ethereum: {
          detected: [
            getRequestMethodMock({
              // eslint-disable-next-line @typescript-eslint/naming-convention
              web3_clientVersion: 'Foo/11.0.0',
            }),
            provider,
          ],
        },
      },
    });

    expect(await getMetaMaskProvider()).toBe(provider);
  });

  it('returns the provider if it is in the `window.ethereum.providers` array', async () => {
    const provider = getRequestMethodMock({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      web3_clientVersion: 'MetaMask/11.0.0',
    });

    Object.defineProperty(globalThis, 'window', {
      writable: true,
      value: {
        ethereum: {
          providers: [
            getRequestMethodMock({
              // eslint-disable-next-line @typescript-eslint/naming-convention
              web3_clientVersion: 'Foo/11.0.0',
            }),
            provider,
          ],
        },
      },
    });

    expect(await getMetaMaskProvider()).toBe(provider);
  });
});

describe('getSnapsProvider', () => {
  beforeEach(() => {
    Object.defineProperty(globalThis, 'window', {
      writable: true,
      value: undefined,
    });
  });

  it('returns `null` if `window` is undefined', async () => {
    expect(await getSnapsProvider()).toBeNull();
  });

  it('returns `null` if no provider is detected', async () => {
    Object.defineProperty(globalThis, 'window', {
      writable: true,
      value: {
        ethereum: undefined,
      },
    });

    expect(await getSnapsProvider()).toBeNull();
  });

  it('returns the provider if it supports Snaps', async () => {
    Object.defineProperty(globalThis, 'window', {
      writable: true,
      value: {
        ethereum: getRequestMethodMock({
          // eslint-disable-next-line @typescript-eslint/naming-convention
          wallet_getSnaps: {},
        }),
      },
    });

    expect(await getSnapsProvider()).not.toBeNull();
  });

  it('returns the provider if it is in the `window.ethereum.detected` array', async () => {
    const provider = getRequestMethodMock({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      wallet_getSnaps: {},
    });

    Object.defineProperty(globalThis, 'window', {
      writable: true,
      value: {
        ethereum: {
          detected: [
            getRequestMethodMock({
              // eslint-disable-next-line @typescript-eslint/naming-convention
              wallet_getSnaps: new Error('Unsupported method.'),
            }),
            provider,
          ],
        },
      },
    });

    expect(await getSnapsProvider()).toBe(provider);
  });

  it('returns the provider if it is in the `window.ethereum.providers` array', async () => {
    const provider = getRequestMethodMock({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      wallet_getSnaps: {},
    });

    Object.defineProperty(globalThis, 'window', {
      writable: true,
      value: {
        ethereum: {
          providers: [
            getRequestMethodMock({
              // eslint-disable-next-line @typescript-eslint/naming-convention
              wallet_getSnaps: new Error('Unsupported method.'),
            }),
            provider,
          ],
        },
      },
    });

    expect(await getSnapsProvider()).toBe(provider);
  });
});

describe('getLatestSnapVersion', () => {
  it('returns the latest version of a registry Snap with one version', () => {
    const snap: VerifiedSnap = {
      versions: {
        // @ts-expect-error - Technically not a valid version.
        '1.0.0': {
          checksum: 'foo',
        },
      },
    };

    expect(getLatestSnapVersion(snap)).toBe('1.0.0');
  });

  it('returns the latest version of a registry Snap with multiple versions', () => {
    const snap: VerifiedSnap = {
      versions: {
        // @ts-expect-error - Technically not a valid version.
        '1.0.0': {
          checksum: 'foo',
        },
        '2.0.0': {
          checksum: 'foo',
        },
      },
    };

    expect(getLatestSnapVersion(snap)).toBe('2.0.0');
  });

  it('returns the latest version of a registry Snap with multiple versions in a different order', () => {
    const snap: VerifiedSnap = {
      versions: {
        // @ts-expect-error - Technically not a valid version.
        '2.0.0': {
          checksum: 'foo',
        },
        '1.1.0': {
          checksum: 'foo',
        },
        '3.6.0': {
          checksum: 'foo',
        },
        '1.0.0': {
          checksum: 'foo',
        },
      },
    };

    expect(getLatestSnapVersion(snap)).toBe('3.6.0');
  });

  it('throws if the Snap has no versions', () => {
    // @ts-expect-error - Partial Snap.
    const snap: VerifiedSnap = {
      id: 'foo-snap',
      versions: {},
    };

    expect(() => getLatestSnapVersion(snap)).toThrow(
      'No latest version found for Snap: foo-snap.',
    );
  });
});
