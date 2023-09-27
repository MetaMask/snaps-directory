import { Image, useColorMode } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import logoDark from '../assets/logo-dark.svg';
import logo from '../assets/logo.svg';

/**
 * Render the Snaps Directory logo.
 *
 * @returns A React component.
 */
export const Logo: FunctionComponent = () => {
  const { colorMode } = useColorMode();

  const src = colorMode === 'light' ? logo : logoDark;
  return <Image src={src} alt="MetaMask Snaps Directory" height="24px" />;
};
