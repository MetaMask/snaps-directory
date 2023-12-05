import { Box, useColorMode } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import SmallLogo from './icons/metamask.svg';
import SvgLogo from '../assets/logo.svg';

/**
 * Render the Snaps Directory logo.
 *
 * @returns A React component.
 */
export const Logo: FunctionComponent = () => {
  const { colorMode } = useColorMode();

  const fill = colorMode === 'light' ? '#161616' : 'white';
  return (
    <>
      <Box
        width="11.95rem"
        height="1.5rem"
        display={{ base: 'none', md: 'block' }}
      >
        <SvgLogo
          width="100%"
          height="100%"
          role="img"
          aria-label="MetaMask Snaps Directory"
          fill={fill}
        />
      </Box>
      <Box
        width="1.603rem"
        height="1.5rem"
        display={{ base: 'block', md: 'none' }}
      >
        <SmallLogo
          width="100%"
          height="100%"
          role="img"
          aria-label="MetaMask Snaps Directory"
          fill={fill}
        />
      </Box>
    </>
  );
};
