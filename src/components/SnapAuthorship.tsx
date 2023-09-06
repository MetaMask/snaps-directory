import { Box, Flex, Text } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { SnapIcon } from './SnapIcon';
import { useInstalledSnaps } from '../hooks';
import type { Fields } from '../utils';

export const SnapAuthorship: FunctionComponent<
  Fields<Queries.Snap, 'name' | 'snapId' | 'svgIcon'>
> = ({ name, snapId, svgIcon }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_installedSnaps, _updateSnaps, cachedInstalledSnaps] =
    useInstalledSnaps();
  const isInstalled = Boolean(cachedInstalledSnaps[snapId]);

  return (
    <Flex alignItems="center">
      <SnapIcon snapName={name} svgIcon={svgIcon} isInstalled={isInstalled} />
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
