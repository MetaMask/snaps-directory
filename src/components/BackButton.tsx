import { Link } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import { Link as GatsbyLink } from 'gatsby';
import type { FunctionComponent } from 'react';

import { Icon } from './Icon';

export const BackButton: FunctionComponent = () => (
  <Link
    as={GatsbyLink}
    to="/"
    display="flex"
    fontWeight="500"
    alignItems="center"
    marginBottom="4"
    gap={'4px'}
    _hover={{ textDecoration: 'none', opacity: '75%' }}
  >
    <Icon icon="back" width="20px" />
    <Trans>Discover Snaps</Trans>
  </Link>
);
