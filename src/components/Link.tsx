import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';
import type {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
  FunctionComponent,
  ReactNode,
} from 'react';

/**
 * `AnchorProps` from `@reach/router`, copied to avoid needing to install
 * `@reach/router` as a dependency.
 */
type AnchorProps = Omit<
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  'href'
>;

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
