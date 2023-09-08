import { SimpleGrid } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import type { Snap } from './providers';
import { SnapCard } from './SnapCard';

export type SnapsGridProps = {
  snaps: Snap[];
};

export const SnapsGrid: FunctionComponent<SnapsGridProps> = ({ snaps }) => (
  <SimpleGrid columns={[1, null, 2, 3]} spacing={4}>
    {snaps.map((snap, index) => (
      <SnapCard key={`${snap.id}-${index}`} {...snap} />
    ))}
  </SimpleGrid>
);

export default SnapsGrid;
