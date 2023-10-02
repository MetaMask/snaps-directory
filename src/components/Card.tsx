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
    rounded="3xl"
    boxShadow="lg"
    background="background.card"
    height="10.438rem"
    _hover={{ backgroundColor: 'background.hover' }}
    {...props}
  >
    {children}
  </Flex>
);
