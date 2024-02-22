import { describe, it, jest } from '@jest/globals';
import type { MetaMaskInpageProvider } from '@metamask/providers';
import type { BaseQueryApi } from '@reduxjs/toolkit/query';
import { when } from 'jest-when';

import { request } from './api';

type RequestFunction = (args: unknown) => Promise<unknown>;
type Methods = Record<string, unknown>;

/**
 * Get a mock MetaMask provider.
 *
 * @param requestFn - The request function.
 * @returns The mock provider.
 */
function getMockProvider(requestFn: RequestFunction): MetaMaskInpageProvider {
  return {
    request: requestFn,
  } as MetaMaskInpageProvider;
}

/**
 * Get a mock request method.
 *
 * @param methods - A key-value map of method names to results.
 * @returns The mocked Ethereum provider.
 */
function getRequestMethodMock(methods: Methods) {
  const fn = jest.fn<RequestFunction>();

  for (const [method, result] of Object.entries(methods)) {
    if (result instanceof Error) {
      when<Promise<unknown>, unknown[]>(fn)
        .calledWith({ method })
        .mockRejectedValue(result);
      continue;
    }

    when<Promise<unknown>, unknown[]>(fn)
      .calledWith({ method })
      .mockResolvedValue(result);
  }

  return getMockProvider(fn);
}

describe('request', () => {
  it('calls the Snaps provider with the given method and params', async () => {
    const provider = getRequestMethodMock({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      wallet_getSnaps: {},
      foo: 'bar',
    });

    Object.defineProperty(globalThis, 'window', {
      writable: true,
      value: {
        ethereum: provider,
      },
    });

    expect(
      await request({ method: 'foo' }, {} as BaseQueryApi, {}),
    ).toStrictEqual({
      data: 'bar',
    });
  });

  it('returns an error if the provider throws', async () => {
    const provider = getRequestMethodMock({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      wallet_getSnaps: {},
      foo: new Error('Unsupported method.'),
    });

    Object.defineProperty(globalThis, 'window', {
      writable: true,
      value: {
        ethereum: provider,
      },
    });

    expect(
      await request({ method: 'foo' }, {} as BaseQueryApi, {}),
    ).toStrictEqual({
      error: new Error('Unsupported method.'),
    });
  });

  it('returns `null` if the provider is not available', async () => {
    Object.defineProperty(globalThis, 'window', {
      writable: true,
      value: {
        ethereum: undefined,
        addEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
        removeEventListener: jest.fn(),
      },
    });

    expect(
      await request({ method: 'foo' }, {} as BaseQueryApi, {}),
    ).toStrictEqual({
      data: null,
    });
  });
});
