import { Button, Link } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { SnapEventType, SnapWebsiteOrigin, track } from '../analytics';
import { ExternalLinkIcon } from './icons';

export type SnapWebsiteButtonProps = {
  snapId: string;
  website: string;
  onboard?: boolean;
};

export const SnapWebsiteButton: FunctionComponent<SnapWebsiteButtonProps> = ({
  snapId,
  website,
  onboard,
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
        variant={onboard ? 'primary' : 'outline'}
        leftIcon={<ExternalLinkIcon width="1.5rem" fill="currentColor" />}
        width="100%"
      >
        <Trans>Website</Trans>
      </Button>
    </Link>
  );
};
