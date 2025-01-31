import { Box } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import SvgLogo from '../assets/logo.svg';

/**
 * Render the Snaps Directory logo.
 *
 * @returns A React component.
 */
export const Logo: FunctionComponent = () => {
  return (
    <Box width="4.103rem" height="2.039rem">
      <Box
        // @ts-expect-error - SVG is a React component but TypeScript thinks
        // it's a string.
        as={SvgLogo}
        width="100%"
        height="100%"
        role="img"
        aria-label="MetaMask Snaps Directory"
        fill="primary.alternative"
      />
    </Box>
  );
};
