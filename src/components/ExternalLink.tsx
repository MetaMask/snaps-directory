import type { LinkProps } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { ExternalLinkIcon } from './icons';

export type ExternalLinkProps = LinkProps;

export const ExternalLink: FunctionComponent<ExternalLinkProps> = ({
  children,
  ...props
}) => (
  <Link {...props} isExternal={true} display="inline-flex" alignItems="center">
    {children}
    <ExternalLinkIcon width="1.25rem" marginLeft="0.5" fill="currentColor" />
  </Link>
);
