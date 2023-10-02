import { expect, jest } from '@jest/globals';
import type { MetaMaskInpageProvider } from '@metamask/providers';
import { when } from 'jest-when';

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
export function getRequestMethodMock(methods: Methods) {
  const fn = jest.fn<RequestFunction>();

  for (const [method, result] of Object.entries(methods)) {
    if (result instanceof Error) {
      when<Promise<unknown>, unknown[]>(fn)
        .calledWith({ method })
        .mockRejectedValue(result);

      when<Promise<unknown>, unknown[]>(fn)
        .calledWith({ method, params: expect.anything() })
        .mockRejectedValue(result);
      continue;
    }

    when<Promise<unknown>, unknown[]>(fn)
      .calledWith({ method })
      .mockResolvedValue(result);

    when<Promise<unknown>, unknown[]>(fn)
      .calledWith({ method, params: expect.anything() })
      .mockResolvedValue(result);
  }

  return getMockProvider(fn);
}
