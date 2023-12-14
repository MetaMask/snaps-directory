import type { FlexProps } from '@chakra-ui/react';
import { Box, Flex } from '@chakra-ui/react';
import type { FunctionComponent, ReactNode } from 'react';

import { Link } from '../../../components';

export type BaseProps = FlexProps & {
  to: string;
  external?: boolean;
  children: ReactNode;
};

export const Base: FunctionComponent<BaseProps> = ({
  to,
  external,
  children,
  ...props
}) => (
  <Box
    position="relative"
    overflow="hidden"
    background="background.default-hover"
    borderRadius="xl"
    width="100%"
    height="100%"
    flexShrink="0"
    transition="opacity 0.3s ease"
    _hover={{
      opacity: '0.8',
      '& button': {
        background: 'info.default',
        color: 'white',
      },
    }}
  >
    <Link to={to} external={external}>
      <Flex
        direction="column"
        height="100%"
        alignItems="center"
        justifyContent="space-between"
        padding="6"
        textAlign="center"
        position="relative"
        zIndex="2"
        {...props}
      >
        {children}
      </Flex>
    </Link>
  </Box>
);
