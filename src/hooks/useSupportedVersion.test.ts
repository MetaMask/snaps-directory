import { act } from 'react-dom/test-utils';

import { SnapStatus, useSupportedVersion } from './useSupportedVersion';
import { renderHook, getRequestMethodMock } from '../utils/test-utils';

describe('useSupportedVersion', () => {
  it('returns `Unknown` if the provider is not detected', async () => {
    const { result } = await act(() => renderHook(() => useSupportedVersion()));

    expect(result.current).toBe(SnapStatus.Unknown);
  });

  it('returns `Unsupported` if the provider is detected but not supported', async () => {
    Object.assign(globalThis, 'window', {
      ethereum: getRequestMethodMock({
        /* eslint-disable @typescript-eslint/naming-convention */
        wallet_getSnaps: new Error('Unsupported method.'),
        web3_clientVersion: 'MetaMask/v11.0.0',
        /* eslint-enable @typescript-eslint/naming-convention */
      }),
    });

    const { result } = await act(() => renderHook(() => useSupportedVersion()));

    expect(result.current).toBe(SnapStatus.Unsupported);
  });

  it('returns `Supported` if the provider is detected and supported', async () => {
    Object.assign(globalThis, 'window', {
      ethereum: getRequestMethodMock({
        /* eslint-disable @typescript-eslint/naming-convention */
        wallet_getSnaps: {},
        web3_clientVersion: 'MetaMask/v11.0.0',
        /* eslint-enable @typescript-eslint/naming-convention */
      }),
    });

    const { result } = await act(() => renderHook(() => useSupportedVersion()));

    expect(result.current).toBe(SnapStatus.Supported);
  });
});
