import { Image } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import logo from '../assets/logo.svg';

/**
 * Render the Snaps Directory logo.
 *
 * @returns A React component.
 */
export const Logo: FunctionComponent = () => {
  return <Image src={logo} alt="MetaMask Snaps Directory" height="24px" />;
};
