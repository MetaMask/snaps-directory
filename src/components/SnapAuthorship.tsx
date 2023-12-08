import { Box, Flex, Heading } from '@chakra-ui/react';
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
    <Flex alignItems="center" overflow="hidden">
      <SnapAvatar
        snapName={name}
        icon={icon}
        size="3.5rem"
        isInstalled={isInstalled}
        marginRight="4"
      />
      <Box overflow="hidden">
        <Heading as="h3" fontSize={['3xl', null, '5xl']} isTruncated>
          {name}
        </Heading>
      </Box>
    </Flex>
  );
};
