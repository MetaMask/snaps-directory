import { Link } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import { Link as GatsbyLink } from 'gatsby';
import type { FunctionComponent } from 'react';

import { BackIcon } from './icons';

export const BackButton: FunctionComponent = () => (
  <Link
    as={GatsbyLink}
    to="/"
    display="flex"
    fontWeight="500"
    alignItems="center"
    marginBottom="4"
    gap="0.25rem"
    _hover={{ textDecoration: 'none', opacity: '75%' }}
  >
    <BackIcon width="1.25rem" />
    <Trans>Discover Snaps</Trans>
  </Link>
);
