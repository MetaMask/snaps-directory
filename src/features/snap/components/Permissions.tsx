import {
  Box,
  Flex,
  Heading,
  ListItem,
  Text,
  Tooltip,
  UnorderedList,
} from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import type { InitialPermissions } from '@metamask/snaps-sdk';
import type { FunctionComponent } from 'react';
import { useMemo } from 'react';

import { AvatarIcon, InfoIcon } from '../../../components';
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
    <Box flex="33.33%">
      <Heading
        as="h4"
        color="text.alternative"
        textTransform="uppercase"
        fontWeight="medium"
        fontSize="sm"
        marginBottom="2"
      >
        <Trans>
          Permissions by{' '}
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
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex gap="4" alignItems="center">
              <Box flexShrink="0">
                <AvatarIcon icon={descriptor.icon} />
              </Box>
              <Text fontSize="md">{i18n._(descriptor.label)}</Text>
            </Flex>
            {descriptor.description && (
              <Tooltip label={i18n._(descriptor.description)} placement="left">
                <InfoIcon flexShrink="0" />
              </Tooltip>
            )}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};
