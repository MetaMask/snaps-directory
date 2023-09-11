import { Flex } from '@chakra-ui/react';
import type { FunctionComponent, ReactNode } from 'react';

import { Footer } from './Footer';
import { Header } from './Header';

type LayoutProps = {
  children?: ReactNode;
};

/**
 * Render the layout of the application.
 *
 * @param props - The component props.
 * @param props.children - The children to render.
 * @returns A React component.
 */
export const Layout: FunctionComponent<LayoutProps> = ({ children }) => (
  <Flex direction="column" height="100vh" overflowY="scroll">
    <Header flexShrink="0" />
    <Flex as="main" direction="column" flexGrow="1">
      {children}
    </Flex>
    <Footer flexShrink="0" />
  </Flex>
);
