import { useContext } from 'react';

import { SnapsProviderContext } from '../components';

/**
 * Get all snaps in a shuffled order. The snaps are shuffled once, and then
 * cached for the lifetime of the application.
 *
 * @returns The snaps, or an empty array if no snaps are available.
 */
export function useShuffledSnaps() {
  return useContext(SnapsProviderContext);
}
