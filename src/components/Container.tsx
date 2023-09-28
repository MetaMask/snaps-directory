import { Box } from '@chakra-ui/react';
import type { FunctionComponent, ReactNode } from 'react';

export type ContainerProps = {
  children: ReactNode;
};

export const Container: FunctionComponent<ContainerProps> = ({ children }) => (
  <Box maxWidth="62.5rem" width="100%" marginX="auto">
    {children}
  </Box>
);
