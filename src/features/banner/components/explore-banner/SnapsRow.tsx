import { Flex, Image, keyframes } from '@chakra-ui/react';
import shuffle from 'lodash/shuffle';
import type { FunctionComponent } from 'react';
import { useMemo } from 'react';

import type { Fields } from '../../../../utils';

export type SnapsRowProps = {
  snaps: Fields<Queries.Snap, 'snapId' | 'icon'>[];
  delay?: number;
};

const SIZE = '5rem';

const animation = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const SnapsRow: FunctionComponent<SnapsRowProps> = ({
  snaps,
  delay = 0,
}) => {
  const shuffledSnaps = useMemo(
    () =>
      shuffle(snaps)
        .filter((snap) => snap.icon)
        .slice(0, 20),
    [snaps],
  );

  return (
    <Flex direction="row" gap="4" data-testid="snaps-row">
      {shuffledSnaps.map((snap, index) => (
        <Image
          key={`${snap.snapId}-${index}`}
          src={snap.icon}
          width={SIZE}
          minWidth={SIZE}
          height={SIZE}
          borderRadius="full"
          animation={`${animation} ${delay + index * 250}ms`}
        />
      ))}
    </Flex>
  );
};
