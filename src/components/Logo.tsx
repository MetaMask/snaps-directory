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
    <Box
      width={{
        base: '7.3125rem',
        md: '14.03vw',
        lg: 'min(10.07vw, 12.08rem)',
      }}
    >
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
