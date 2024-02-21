import type {
  EIP6963AnnounceProviderEvent,
  EIP6963RequestProviderEvent,
  MetaMaskInpageProvider,
} from '@metamask/providers';

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

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface WindowEventMap {
    'eip6963:requestProvider': EIP6963RequestProviderEvent;
    'eip6963:announceProvider': EIP6963AnnounceProviderEvent;
  }
}
