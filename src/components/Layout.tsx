import { Flex } from '@chakra-ui/react';
import type { FunctionComponent, ReactNode } from 'react';

import { Footer } from './Footer';
import { Header } from './Header';
import { RegistrySnapCategory } from '../constants';
import type { Fields } from '../utils';

type LayoutProps = {
  children?: ReactNode;
  data?: {
    snap?: Fields<
      Queries.Snap,
      | 'name'
      | 'icon'
      | 'snapId'
      | 'description'
      | 'latestVersion'
      | 'website'
      | 'onboard'
      | 'category'
      | 'author'
      | 'sourceCode'
      | 'audits'
      | 'banner'
      | 'support'
      | 'privateCode'
    >;
  };
};

/**
 * Render the layout of the application.
 *
 * @param props - The component props.
 * @param props.children - The children to render.
 * @param props.data - If the current page is a Snap page, this will be the Snap
 * data.
 * @returns A React component.
 */
export const Layout: FunctionComponent<LayoutProps> = ({ data, children }) => (
  <Flex direction="column" height="100vh" position="relative" paddingTop="5rem">
    <Header flexShrink="0" />
    <Flex as="main" direction="column" flexGrow="1">
      {children}
    </Flex>
    <Footer
      flexShrink="0"
      isAccountManagement={
        data?.snap?.category === RegistrySnapCategory.AccountManagement
      }
    />
  </Flex>
);
