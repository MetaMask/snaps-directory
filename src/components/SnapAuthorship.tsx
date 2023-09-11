import { Box, Flex, Text } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { SnapIcon } from './SnapIcon';
import { useEthereumProvider } from '../hooks';
import type { Fields } from '../utils';

export const SnapAuthorship: FunctionComponent<
  Fields<Queries.Snap, 'name' | 'snapId' | 'icon'>
> = ({ name, snapId, icon }) => {
  const { snaps } = useEthereumProvider();
  const isInstalled = Boolean(snaps[snapId]);

  return (
    <Flex alignItems="center" width={{ base: '100%', md: 'auto' }}>
      <SnapIcon snapName={name} icon={icon} isInstalled={isInstalled} />
      <Box ml="2" overflow="hidden">
        <Text fontWeight="semibold" isTruncated>
          {name}
        </Text>
        <Text color="gray.muted" fontFamily="custom" fontSize="xs" isTruncated>
          {snapId.slice(4)}
        </Text>
      </Box>
    </Flex>
  );
};
