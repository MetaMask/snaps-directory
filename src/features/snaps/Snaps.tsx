import { SimpleGrid } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { LoadingGrid, SnapCard } from './components';
import { useSelector } from '../../hooks';
import { getFilteredSnaps } from '../filter';

export const Snaps: FunctionComponent = () => {
  const snaps = useSelector(getFilteredSnaps);

  if (snaps.length === 0) {
    return <LoadingGrid />;
  }

  return (
    <SimpleGrid columns={[1, null, 2, 3]} spacing={4}>
      {snaps.map((snap, index) => (
        <SnapCard key={`${snap.id}-${index}`} {...snap} />
      ))}
    </SimpleGrid>
  );
};
