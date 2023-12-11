import { Box, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import type { InitialPermissions } from '@metamask/snaps-sdk';
import type { FunctionComponent } from 'react';
import { useMemo } from 'react';

import { AvatarIcon } from '../../../components';
import type { PermissionsSnap } from '../permissions';
import { getPermissions } from '../permissions';

export type PermissionsProps = {
  snap: PermissionsSnap;
  permissions: InitialPermissions;
};

export const Permissions: FunctionComponent<PermissionsProps> = ({
  snap,
  permissions,
}) => {
  const i18n = useLingui();
  const descriptors = useMemo(
    () => getPermissions(snap, permissions),
    [snap, permissions],
  );

  return (
    <Box>
      <Heading
        as="h4"
        color="text.alternative"
        textTransform="uppercase"
        fontWeight="medium"
        fontSize="sm"
      >
        <Trans>
          Permissions requested by{' '}
          <Text
            as="span"
            color="text.default"
            textTransform="uppercase"
            fontWeight="medium"
            fontSize="sm"
          >
            {snap.name}
          </Text>
        </Trans>
      </Heading>
      <UnorderedList
        display="flex"
        flexDirection="column"
        gap="2"
        marginLeft="0"
      >
        {descriptors.map((descriptor) => (
          <ListItem
            key={i18n._(descriptor.label)}
            display="flex"
            paddingY="2"
            gap="4"
          >
            <Box flexShrink="0">
              <AvatarIcon icon={descriptor.icon} />
            </Box>
            <Box>
              <Heading as="h5" fontSize="md">
                {i18n._(descriptor.label)}
              </Heading>
              <Text color="text.alternative">
                {i18n._(descriptor.description)}
              </Text>
            </Box>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};
