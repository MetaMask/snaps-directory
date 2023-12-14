import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';
import type { FunctionComponent, ReactNode } from 'react';

export type LinkProps = {
  to: string;
  external?: boolean | undefined;
  children?: ReactNode;
};

export const Link: FunctionComponent<LinkProps> = ({
  to,
  external,
  children,
}) => {
  if (external) {
    return (
      <ChakraLink
        href={to}
        isExternal
        _hover={{
          textDecoration: 'none',
        }}
      >
        {children}
      </ChakraLink>
    );
  }

  return <GatsbyLink to={to}>{children}</GatsbyLink>;
};
