import type { MetaMaskInpageProvider } from '@metamask/providers';
import type { SnapsRegistryDatabase } from '@metamask/snaps-registry';
import semver from 'semver/preload';

export type DeepFields<Type> = Type extends Record<string, unknown>
  ? Fields<Type, keyof Type>
  : Type;

export type Fields<Query, Name extends keyof Query> = {
  [Key in Name]: Query[Key] extends Queries.Maybe<infer Inner>
    ? DeepFields<Inner>
    : never;
};

/**
 * Check if the current provider supports snaps by calling `wallet_getSnaps`.
 *
 * @param provider - The provider to use to check for snaps support. Defaults to
 * `window.ethereum`.
 * @returns True if the provider supports snaps, false otherwise.
 */
export async function hasSnapsSupport(
  provider: MetaMaskInpageProvider = window.ethereum,
) {
  try {
    await provider.request({
      method: 'wallet_getSnaps',
    });

    return true;
  } catch {
    return false;
  }
}

/**
 * Check if the current provider is MetaMask by calling `web3_clientVersion`.
 *
 * @param provider - The provider to use to check for MetaMask. Defaults to
 * `window.ethereum`.
 * @returns True if the provider is MetaMask, false otherwise.
 */
export async function isMetaMaskProvider(
  provider: MetaMaskInpageProvider = window.ethereum,
) {
  try {
    const result = await provider.request<string>({
      method: 'web3_clientVersion',
    });

    return result?.toLowerCase().includes('metamask');
  } catch {
    return false;
  }
}

/**
 * Get a MetaMask provider. This will loop through all the detected providers
 * and return the first one that is MetaMask.
 */
export async function getMetaMaskProvider() {
  if (typeof window === 'undefined') {
    return null;
  }

  if (await isMetaMaskProvider()) {
    return window.ethereum;
  }

  if (window.ethereum?.detected) {
    for (const provider of window.ethereum.detected) {
      if (await isMetaMaskProvider(provider)) {
        return provider;
      }
    }
  }

  if (window.ethereum?.providers) {
    for (const provider of window.ethereum.providers) {
      if (await isMetaMaskProvider(provider)) {
        return provider;
      }
    }
  }

  return null;
}

/**
 * Get a provider that supports snaps. This will loop through all the detected
 * providers and return the first one that supports snaps.
 *
 * @returns The provider, or `null` if no provider supports snaps.
 */
export async function getSnapsProvider() {
  if (typeof window === 'undefined') {
    return null;
  }

  if (await hasSnapsSupport()) {
    return window.ethereum;
  }

  if (window.ethereum?.detected) {
    for (const provider of window.ethereum.detected) {
      if (await hasSnapsSupport(provider)) {
        return provider;
      }
    }
  }

  if (window.ethereum?.providers) {
    for (const provider of window.ethereum.providers) {
      if (await hasSnapsSupport(provider)) {
        return provider;
      }
    }
  }

  return null;
}

export type VerifiedSnap = SnapsRegistryDatabase['verifiedSnaps'][string];

/**
 * Get the latest version of the given Snap.
 *
 * @param snap - The Snap to get the latest version for.
 * @returns The latest version of the Snap.
 */
export function getLatestSnapVersion(snap: VerifiedSnap) {
  const [latest] = Object.keys(snap.versions).sort((a, b) => {
    return semver.compare(b, a);
  });

  // This should never happen. The validation in the registry ensures that
  // there is always at least one version.
  if (!latest) {
    throw new Error(`No latest version found for Snap: ${snap.id}.`);
  }

  return latest;
}
