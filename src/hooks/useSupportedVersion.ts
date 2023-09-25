import type { MetaMaskInpageProvider } from '@metamask/providers';
import { useEffect, useState } from 'react';

import { useGetVersionQuery } from '../features/snaps/api';
import { getMetaMaskProvider } from '../utils';

export enum SnapStatus {
  Supported = 'supported',
  Unsupported = 'unsupported',
  Unknown = 'unknown',
}

/**
 * Check if the current provider supports Snaps.
 *
 * @returns The status of the current provider.
 */
export function useSupportedVersion() {
  const [provider, setProvider] = useState<MetaMaskInpageProvider | null>(null);
  const [status, setStatus] = useState<SnapStatus>(SnapStatus.Unknown);
  const { data: version } = useGetVersionQuery();

  useEffect(() => {
    getMetaMaskProvider().then(setProvider).catch(console.error);
  }, []);

  useEffect(() => {
    // If the provider isn't detected, it's not MetaMask.
    if (!provider) {
      setStatus(SnapStatus.Unknown);
      return;
    }

    // If the Snaps provider is detected, we know it supports Snaps.
    if (version) {
      setStatus(SnapStatus.Supported);
      return;
    }

    // Otherwise, it's a version of MetaMask that doesn't support Snaps.
    setStatus(SnapStatus.Unsupported);
  }, [provider, version]);

  return status;
}
