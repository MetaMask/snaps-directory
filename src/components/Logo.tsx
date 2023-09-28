import { Box, useColorMode } from '@chakra-ui/react';
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

  const Component = colorMode === 'light' ? logo : logoDark;
  return (
    <Box height="1.5rem">
      <Component
        width="100%"
        height="100%"
        role="img"
        aria-label="MetaMask Snaps Directory"
      />
    </Box>
  );
};
