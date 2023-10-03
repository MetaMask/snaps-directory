import type { MetaMaskInpageProvider } from '@metamask/providers';

import type { SnapEventType } from '../analytics';

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    ethereum: MetaMaskInpageProvider & {
      setProvider?: (provider: MetaMaskInpageProvider) => void;
      detected?: MetaMaskInpageProvider[];
      providers?: MetaMaskInpageProvider[];
    };

    analytics: {
      track: (event: SnapEventType, data: unknown) => void;
    };
  }
}
