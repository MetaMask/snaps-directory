import type { FlexProps } from '@chakra-ui/react';
import { Box, Flex } from '@chakra-ui/react';
import type { FunctionComponent, ReactNode } from 'react';

import { Link } from '../../../components';

export type BaseProps = FlexProps & {
  to: string;
  external?: boolean;
  background?: string;
  backgroundImage?: string;
  children: ReactNode;
};

export const Base: FunctionComponent<BaseProps> = ({
  to,
  external,
  background = 'background.default-hover',
  backgroundImage,
  children,
  ...props
}) => (
  <Box
    position="relative"
    overflow="hidden"
    background={background}
    borderRadius="xl"
    width="100%"
    height="100%"
    flexShrink="0"
    transition="opacity 0.3s ease"
    _hover={{
      opacity: '0.8',
      '& button': {
        opacity: 1,
        background: 'info.default',
        color: 'white',
        '.chakra-button__icon': {
          svg: {
            fill: 'white',
          },
        },
      },
    }}
  >
    <Link to={to} external={external} data-testid="banner-link">
      <Flex
        direction="column"
        height="100%"
        alignItems="center"
        justifyContent="space-between"
        padding="6"
        textAlign="center"
        position="relative"
        zIndex="2"
        backgroundImage={backgroundImage as string}
        backgroundPosition="bottom"
        backgroundRepeat="no-repeat"
        {...props}
      >
        {children}
      </Flex>
    </Link>
  </Box>
);
