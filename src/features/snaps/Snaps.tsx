import { SimpleGrid } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { LoadingGrid, NoSnaps, SnapCard } from './components';
import { useSelector } from '../../hooks';
import { getFilteredSnaps } from '../filter';

export const Snaps: FunctionComponent = () => {
  const snaps = useSelector(getFilteredSnaps);

  if (!snaps) {
    return <LoadingGrid />;
  }

  if (snaps.length === 0) {
    return <NoSnaps />;
  }

  return (
    <SimpleGrid columns={[1, null, 2, 3]} spacing={4}>
      {snaps.map((snap, index) => (
        <SnapCard key={`${snap.id}-${index}`} {...snap} />
      ))}
    </SimpleGrid>
  );
};
