import type { BoxProps } from '@chakra-ui/react';
import { Box, useColorMode } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import logoDark from '../assets/metamask-logo-dark.svg';
import logo from '../assets/metamask-logo.svg';

export type MetaMaskLogoProps = BoxProps;

/**
 * Render the MetaMask logo.
 *
 * @param props - The component props.
 * @returns A React component.
 */
export const MetaMaskLogo: FunctionComponent<MetaMaskLogoProps> = (props) => {
  const { colorMode } = useColorMode();

  const SVG = colorMode === 'light' ? logo : logoDark;
  return (
    <Box height="2.5rem" {...props}>
      <SVG role="img" aria-label="MetaMask" />
    </Box>
  );
};
