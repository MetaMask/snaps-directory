import { useCallback, useEffect, useState } from 'react';

import { useEthereumProvider } from './useEthereumProvider';

const LOCALSTORAGE_KEY = 'installed-cache';

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

  const loadCache = () => {
    try {
      const cached = window.localStorage.getItem(LOCALSTORAGE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch {
      // no op
    }
    return {};
  };

  const [cachedInstalledSnaps, setCachedInstalledSnaps] = useState<
    Record<string, { version: string }>
  >(loadCache());

  useEffect(() => {
    if (Object.keys(installedSnaps).length > 0) {
      setCachedInstalledSnaps(installedSnaps);
      window.localStorage.setItem(
        LOCALSTORAGE_KEY,
        JSON.stringify(installedSnaps),
      );
    }
  }, [installedSnaps]);

  const updateSnaps = useCallback(() => {
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

  useEffect(() => {
    updateSnaps();
  }, [provider, updateSnaps]);

  return [installedSnaps, updateSnaps, cachedInstalledSnaps] as const;
}
