import { Box, Flex } from '@chakra-ui/react';
import type { FunctionComponent, ReactNode } from 'react';

import { Link } from '../../../components';

export type BaseProps = {
  to: string;
  external?: boolean;
  children: ReactNode;
};

export const Base: FunctionComponent<BaseProps> = ({
  to,
  external,
  children,
}) => (
  <Box
    position="relative"
    overflow="hidden"
    background="background.default-hover"
    borderRadius="xl"
    width="100%"
    height="100%"
    flexShrink="0"
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
      >
        {children}
      </Flex>
    </Link>
  </Box>
);
