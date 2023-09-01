import { Flex, Text } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { SnapIcon } from './SnapIcon';
import type { Fields } from '../utils';

export const SnapAuthorship: FunctionComponent<
  Fields<Queries.Snap, 'name' | 'snapId' | 'svgIcon'>
> = ({ name, snapId, svgIcon }) => {
  return (
    <Flex>
      <SnapIcon snapName={name} svgIcon={svgIcon} />
      <Flex ml="2" flexDirection="column" justifyContent="center">
        <Text fontWeight="semibold" isTruncated>
          {name}
        </Text>
        <Text color="gray.muted" fontFamily="custom" isTruncated>
          {snapId.slice(4)}
        </Text>
      </Flex>
    </Flex>
  );
};
