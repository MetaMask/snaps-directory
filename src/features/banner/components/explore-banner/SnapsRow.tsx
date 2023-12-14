import { Flex, Image } from '@chakra-ui/react';
import shuffle from 'lodash/shuffle';
import type { FunctionComponent } from 'react';
import { useMemo } from 'react';

import type { Fields } from '../../../../utils';

export type SnapsRowProps = {
  snaps: Fields<Queries.Snap, 'snapId' | 'icon'>[];
};

const SIZE = '5rem';

export const SnapsRow: FunctionComponent<SnapsRowProps> = ({ snaps }) => {
  const shuffledSnaps = useMemo(() => shuffle(snaps).slice(0, 20), [snaps]);

  return (
    <Flex direction="row" gap="4">
      {shuffledSnaps.map((snap, index) => (
        <Image
          key={`${snap.snapId}-${index}`}
          src={snap.icon}
          width={SIZE}
          minWidth={SIZE}
          height={SIZE}
          borderRadius="full"
        />
      ))}
    </Flex>
  );
};
