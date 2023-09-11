import type { MetaMaskInpageProvider } from '@metamask/providers';
import type { FunctionComponent, ReactNode } from 'react';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { getEthereumProvider } from '../../utils';

const LOCALSTORAGE_KEY = 'installed-cache';

export type EthereumProviderContextType = {
  provider: MetaMaskInpageProvider | null;
  snaps: InstalledSnaps;
  updateSnaps: () => void;
};

export const EthereumProviderContext =
  createContext<EthereumProviderContextType>({
    provider: null,
    snaps: {},
    updateSnaps: () => undefined,
  });

export type EthereumProviderProps = {
  children: ReactNode;
};

export type InstalledSnaps = Record<string, { version: string }>;

/**
 * Get the installed snaps.
 *
 * @param provider - The Ethereum provider.
 * @returns The installed snaps, or null if the provider is not available.
 */
async function getSnaps(
  provider: MetaMaskInpageProvider | null,
): Promise<InstalledSnaps | null> {
  const snaps = await provider?.request<InstalledSnaps>({
    method: 'wallet_getSnaps',
  });

  if (snaps) {
    return snaps as InstalledSnaps;
  }

  return null;
}

/**
 * Get the cached snaps from local storage. If there are no cached snaps, an
 * empty object is returned.
 *
 * @returns The cached snaps.
 */
function getCachedSnaps(): InstalledSnaps {
  if (typeof localStorage === 'undefined') {
    return {};
  }

  try {
    const cachedSnaps = localStorage.getItem(LOCALSTORAGE_KEY);
    if (cachedSnaps) {
      return JSON.parse(cachedSnaps);
    }

    return {};
  } catch (error) {
    // If there's an error, e.g., when the JSON is invalid, return an empty
    // object.
    console.error(error);
    return {};
  }
}

export const EthereumProvider: FunctionComponent<EthereumProviderProps> = ({
  children,
}) => {
  const [provider, setProvider] = useState<MetaMaskInpageProvider | null>(null);
  const [snaps, setSnaps] = useState<InstalledSnaps | null>(null);
  const cachedSnaps = useMemo(() => getCachedSnaps(), []);

  const updateSnaps = useCallback(() => {
    getSnaps(provider).then(setSnaps).catch(console.error);
  }, [provider]);

  useEffect(() => {
    getEthereumProvider()
      .then(setProvider)
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    updateSnaps();
  }, [provider, updateSnaps]);

  useEffect(() => {
    if (!snaps || typeof localStorage === 'undefined') {
      return;
    }

    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(snaps));
  }, [snaps]);

  return (
    <EthereumProviderContext.Provider
      value={{ provider, snaps: snaps ?? cachedSnaps, updateSnaps }}
    >
      {children}
    </EthereumProviderContext.Provider>
  );
};
