import { Box, Flex, Heading } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { SnapAvatar } from '../../../components';
import type { Fields } from '../../../utils';
import { useGetInstalledSnapsQuery } from '../../snaps';

export const Authorship: FunctionComponent<
  Fields<Queries.Snap, 'name' | 'snapId' | 'icon'>
> = ({ name, snapId, icon }) => {
  const { data: installedSnaps } = useGetInstalledSnapsQuery();
  const isInstalled = Boolean(installedSnaps?.[snapId]);

  return (
    <Flex
      alignItems="center"
      overflow="hidden"
      flexDirection={['column', null, 'row']}
      gap="4"
    >
      <SnapAvatar
        snapName={name}
        icon={icon}
        size={['6rem', null, '3.5rem']}
        isInstalled={isInstalled}
        background="none"
      />
      <Box overflow="hidden">
        <Heading as="h3" fontSize={['3xl', null, '5xl']} isTruncated>
          {name}
        </Heading>
      </Box>
    </Flex>
  );
};
