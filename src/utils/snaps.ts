import type {
  EIP6963AnnounceProviderEvent,
  MetaMaskInpageProvider,
} from '@metamask/providers';
import type { SnapsRegistryDatabase } from '@metamask/snaps-registry';
import type { IGatsbyImageData } from 'gatsby-plugin-image';
import semver from 'semver/preload';

export type DeepFields<Type> = Type extends (infer ArrayType)[]
  ? DeepFields<ArrayType>
  : Type extends Record<string, unknown>
  ? Fields<Type, keyof Type>
  : Type;

export type Fields<Query, Name extends keyof Query> = {
  [Key in Name]: Query[Key] extends Queries.Maybe<infer Inner>
    ? DeepFields<Inner>
    : never;
};

/**
 * Check if the current provider supports snaps by calling `wallet_getAllSnaps`.
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
      method: 'wallet_getAllSnaps',
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
 * Get a MetaMask provider using EIP6963. This will return the first provider
 * reporting as MetaMask. If no provider is found after 500ms, this will
 * return null instead.
 *
 * @returns A MetaMask provider if found, otherwise null.
 */
export async function getMetaMaskEIP6963Provider() {
  return new Promise<MetaMaskInpageProvider | null>((rawResolve) => {
    // Timeout looking for providers after 500ms
    const timeout = setTimeout(() => {
      resolve(null);
    }, 500);

    /**
     * Resolve the promise with a MetaMask provider and clean up.
     *
     * @param provider - A MetaMask provider if found, otherwise null.
     */
    function resolve(provider: MetaMaskInpageProvider | null) {
      window.removeEventListener(
        'eip6963:announceProvider',
        onAnnounceProvider,
      );
      clearTimeout(timeout);
      rawResolve(provider);
    }

    /**
     * Listener for the EIP6963 announceProvider event.
     *
     * Resolves the promise if a MetaMask provider is found.
     *
     * @param event - The EIP6963 announceProvider event.
     */
    function onAnnounceProvider(event: EIP6963AnnounceProviderEvent) {
      const { info, provider } = event.detail;

      if (info.rdns.includes('io.metamask')) {
        resolve(provider);
      }
    }

    window.addEventListener('eip6963:announceProvider', onAnnounceProvider);

    window.dispatchEvent(new Event('eip6963:requestProvider'));
  });
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

  const eip6963Provider = await getMetaMaskEIP6963Provider();

  if (eip6963Provider) {
    return eip6963Provider;
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

  const eip6963Provider = await getMetaMaskEIP6963Provider();

  if (eip6963Provider && (await hasSnapsSupport(eip6963Provider))) {
    return eip6963Provider;
  }

  return null;
}

export type VerifiedSnap = SnapsRegistryDatabase['verifiedSnaps'][string];

export type Screenshot = {
  childImageSharp: {
    medium: IGatsbyImageData;
    large: IGatsbyImageData;
  };
};

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
