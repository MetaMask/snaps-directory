import { useEffect, useState } from 'react';

import { useEthereumProvider } from './useEthereumProvider';

/**
 * Get the installed snaps that the current page has access to. Note that if a
 * snap is installed from another website, it will not show up in the list here,
 * unless the user has explicitly granted access to the snap.
 *
 * @returns An object with installed snaps.
 */
export function useInstalledSnaps() {
  const provider = useEthereumProvider();
  const [installedSnaps, setInstalledSnaps] = useState<
    Record<string, { version: string }>
  >({});

  useEffect(() => {
    if (!provider) {
      return;
    }

    provider
      .request({
        method: 'wallet_getSnaps',
      })
      .then((snaps) => {
        if (!snaps) {
          return;
        }

        setInstalledSnaps(snaps as Record<string, { version: string }>);
      })
      .catch((error) => console.error(error));
  }, [provider]);

  return installedSnaps;
}
