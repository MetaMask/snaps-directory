import { Button, Link } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { ExternalLinkIcon } from './icons';
import { SnapEventType, SnapWebsiteOrigin, track } from '../analytics';

export type SnapWebsiteButtonProps = {
  snapId: string;
  website: string;
};

export const SnapWebsiteButton: FunctionComponent<SnapWebsiteButtonProps> = ({
  snapId,
  website,
}) => {
  const handleClick = () => {
    track({
      type: SnapEventType.Website,
      origin: SnapWebsiteOrigin.Button,
      snapId,
    });
  };

  return (
    <Link
      href={website}
      isExternal={true}
      _hover={{ textDecoration: 'none' }}
      width={{ base: '100%', md: 'auto' }}
      onClick={handleClick}
    >
      <Button
        variant="primary"
        leftIcon={<ExternalLinkIcon width="1.5rem" fill="currentColor" />}
        width="100%"
      >
        <Trans>Open</Trans>
      </Button>
    </Link>
  );
};
