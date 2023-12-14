import { Box, Heading, MenuItem, Stack, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import { Link } from 'gatsby';
import type { FunctionComponent } from 'react';

import type { Snap } from '../..';
import { isUpdateAcknowledged } from '../..';
import { DotIcon, SnapAvatar } from '../../../components';
import { useSelector } from '../../../hooks';

export type NotificationProps = {
  snap: Snap;
};

export const Notification: FunctionComponent<NotificationProps> = ({
  snap,
}) => {
  const acknowledged = useSelector(
    isUpdateAcknowledged(snap.snapId, snap.latestVersion),
  );

  return (
    <MenuItem borderRadius="lg" display="block">
      <Link to={snap.gatsbyPath}>
        <Stack direction="row" alignItems="center" paddingX="2">
          <SnapAvatar
            snapName={snap.name}
            icon={snap.icon}
            isInstalled={true}
            size="2.75rem"
            badgeSize="1.375rem"
          />
          <Stack direction="row" justifyContent="space-between" flexGrow="1">
            <Box>
              <Heading as="h3" fontSize="sm" lineHeight="150%">
                {snap.name}
              </Heading>
              <Text lineHeight="150%" fontSize="sm">
                <Trans>Version {snap.latestVersion} update available</Trans>
              </Text>
            </Box>
            {!acknowledged && <DotIcon />}
          </Stack>
        </Stack>
      </Link>
    </MenuItem>
  );
};
