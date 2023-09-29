import { Flex } from '@chakra-ui/react';
import type { FunctionComponent, ReactNode } from 'react';

export type CardProps = {
  children?: ReactNode;
};

export const Card: FunctionComponent<CardProps> = ({ children }) => (
  <Flex
    flexDirection="column"
    px="4"
    py="4"
    rounded="3xl"
    boxShadow="lg"
    background="background.card"
    height="10.438rem"
    _hover={{ backgroundColor: 'background.hover' }}
  >
    {children}
  </Flex>
);
