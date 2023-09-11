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
    backgroundColor="white"
    height="167px"
    _hover={{ backgroundColor: '#F8F8F8' }}
  >
    {children}
  </Flex>
);
