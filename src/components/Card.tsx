import type { FlexProps } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import type { FunctionComponent, ReactNode } from 'react';

export type CardProps = FlexProps & {
  children?: ReactNode;
};

export const Card: FunctionComponent<CardProps> = ({ children, ...props }) => (
  <Flex
    flexDirection="column"
    px="4"
    py="4"
    rounded="lg"
    transitionDuration="normal"
    _hover={{ background: 'background.default-hover' }}
    {...props}
  >
    {children}
  </Flex>
);
