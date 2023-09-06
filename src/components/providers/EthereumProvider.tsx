import type { MetaMaskInpageProvider } from '@metamask/providers';
import type { FunctionComponent, ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';

import { getEthereumProvider } from '../../utils';

export const EthereumProviderContext =
  createContext<MetaMaskInpageProvider | null>(null);

export type EthereumProviderProps = {
  children: ReactNode;
};

export const EthereumProvider: FunctionComponent<EthereumProviderProps> = ({
  children,
}) => {
  const [provider, setProvider] = useState<MetaMaskInpageProvider | null>(null);

  useEffect(() => {
    getEthereumProvider()
      .then(setProvider)
      .catch((error) => console.error(error));
  }, []);

  return (
    <EthereumProviderContext.Provider value={provider}>
      {children}
    </EthereumProviderContext.Provider>
  );
};
