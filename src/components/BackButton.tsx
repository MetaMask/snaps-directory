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
  >
    <Icon icon="back" width="24px" />
    <Trans>Discover Snaps</Trans>
  </Link>
);
