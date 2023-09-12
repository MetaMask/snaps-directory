import type { MetaMaskInpageProvider } from '@metamask/providers';
import { useEffect, useState } from 'react';
import semver from 'semver/preload';

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

  useEffect(() => {
    getMetaMaskProvider().then(setProvider).catch(console.error);
  }, []);

  useEffect(() => {
    if (!provider) {
      setStatus(SnapStatus.Unknown);
      return;
    }

    provider
      .request<string>({
        method: 'web3_clientVersion',
      })
      .then((result) => {
        if (result) {
          const version = result.split('/')[1];

          if (version && semver.gte(version, 'v11.0.0')) {
            return setStatus(SnapStatus.Supported);
          }

          return setStatus(SnapStatus.Unsupported);
        }

        return setStatus(SnapStatus.Unknown);
      })
      .catch(console.error);
  }, [provider]);

  return status;
}
