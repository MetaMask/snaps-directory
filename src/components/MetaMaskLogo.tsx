import type { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import Logo from '../assets/logo.svg';

export type MetaMaskLogoProps = BoxProps;

/**
 * Render the MetaMask logo.
 *
 * @param props - The component props.
 * @returns A React component.
 */
export const MetaMaskLogo: FunctionComponent<MetaMaskLogoProps> = (props) => {
  return (
    <Box {...props}>
      <Box
        // @ts-expect-error - SVG is a React component but TypeScript thinks
        // it's a string.
        as={Logo}
        role="img"
        width="8.125rem"
        height="4.038rem"
        aria-label="MetaMask"
        fill="primary.alternative"
      />
    </Box>
  );
};
