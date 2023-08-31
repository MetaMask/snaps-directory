import { Flex } from "@chakra-ui/react";
import type { FunctionComponent, ReactNode } from "react";
import React from "react";

import { Header } from "./Header";

type LayoutProps = {
  children?: ReactNode;
};

/**
 * Render the layout of the application.
 *
 * @returns A React component.
 */
export const Layout: FunctionComponent<LayoutProps> = ({ children }) => (
  <Flex direction="column" height="100vh">
    <Header />
    <Flex direction="column">{children}</Flex>
  </Flex>
);
