import type { ImageProps } from '@chakra-ui/react';
import { Image, useColorMode } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import logoDark from '../assets/metamask-logo-dark.svg';
import logo from '../assets/metamask-logo.svg';

export type MetaMaskLogoProps = ImageProps;

/**
 * Render the MetaMask logo.
 *
 * @param props - The component props.
 * @returns A React component.
 */
export const MetaMaskLogo: FunctionComponent<MetaMaskLogoProps> = (props) => {
  const { colorMode } = useColorMode();

  const src = colorMode === 'light' ? logo : logoDark;
  return <Image src={src} alt="MetaMask" height="40px" {...props} />;
};
