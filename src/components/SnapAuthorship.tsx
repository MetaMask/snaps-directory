import { Box, Flex, Text } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { SnapAvatar } from './SnapAvatar';
import { useGetInstalledSnapsQuery } from '../features';
import type { Fields } from '../utils';

export const SnapAuthorship: FunctionComponent<
  Fields<Queries.Snap, 'name' | 'snapId' | 'icon'>
> = ({ name, snapId, icon }) => {
  const { data: installedSnaps } = useGetInstalledSnapsQuery();
  const isInstalled = Boolean(installedSnaps?.[snapId]);

  return (
    <Flex alignItems="center" width={{ base: '100%', md: 'auto' }}>
      <SnapAvatar snapName={name} icon={icon} isInstalled={isInstalled} />
      <Box ml="2" overflow="hidden">
        <Text fontWeight="medium" isTruncated>
          {name}
        </Text>
        <Text
          color="text.alternative"
          fontWeight="medium"
          fontSize="xs"
          isTruncated
        >
          {snapId.slice(4)}
        </Text>
      </Box>
    </Flex>
  );
};
