import type { BoxProps } from '@chakra-ui/react';
import { Box, useColorMode } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import Logo from '../assets/metamask-logo.svg';

export type MetaMaskLogoProps = BoxProps;

/**
 * Render the MetaMask logo.
 *
 * @param props - The component props.
 * @returns A React component.
 */
export const MetaMaskLogo: FunctionComponent<MetaMaskLogoProps> = (props) => {
  const { colorMode } = useColorMode();

  const fill = colorMode === 'light' ? '#161616' : 'white';
  return (
    <Box height="2.5rem" {...props}>
      <Logo role="img" aria-label="MetaMask" fill={fill} />
    </Box>
  );
};
