import semver from 'semver/preload';

import { useEthereumProvider } from './useEthereumProvider';

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
  const { version } = useEthereumProvider();

  if (version !== null) {
    if (semver.gte(version, 'v11.0.0')) {
      return SnapStatus.Supported;
    }

    return SnapStatus.Unsupported;
  }

  return SnapStatus.Unknown;
}
