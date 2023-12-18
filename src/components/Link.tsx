import { Link as ChakraLink } from '@chakra-ui/react';
import type { AnchorProps } from '@reach/router';
import { Link as GatsbyLink } from 'gatsby';
import type { FunctionComponent, ReactNode } from 'react';

export type LinkProps = Omit<AnchorProps, 'ref' | 'onClick' | 'color'> & {
  to: string;
  external?: boolean | undefined;
  children?: ReactNode;
};

export const Link: FunctionComponent<LinkProps> = ({
  to,
  external,
  children,
  ...props
}) => {
  if (external) {
    return (
      <ChakraLink
        href={to}
        isExternal
        _hover={{
          textDecoration: 'none',
        }}
        {...props}
      >
        {children}
      </ChakraLink>
    );
  }

  return (
    <GatsbyLink to={to} {...props}>
      {children}
    </GatsbyLink>
  );
};
