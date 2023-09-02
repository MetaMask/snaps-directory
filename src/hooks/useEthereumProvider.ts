import { useContext } from 'react';

import { EthereumProviderContext } from '../components';

/**
 * Get a provider that supports snaps. This will loop through all the detected
 * providers and return the first one that supports snaps.
 *
 * @returns The provider, or `null` if no provider supports snaps.
 */
export function useEthereumProvider() {
  return useContext(EthereumProviderContext);
}
