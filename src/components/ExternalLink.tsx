import type { LinkProps } from '@chakra-ui/react';
import { Link } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { Icon } from './Icon';

export type ExternalLinkProps = LinkProps;

export const ExternalLink: FunctionComponent<ExternalLinkProps> = ({
  children,
  ...props
}) => (
  <Link {...props} isExternal={true} display="inline-flex" alignItems="center">
    {children}
    <Icon icon="externalLink" width="20px" marginLeft="1.5" />
  </Link>
);
