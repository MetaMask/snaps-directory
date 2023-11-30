import { SimpleGrid } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { LoadingGrid, SnapCard } from './components';
import { getSnapsByFilter } from './store';
import type { RegistrySnapCategory } from '../../constants';
import { useSelector } from '../../hooks';
import type { Order } from '../filter/constants';

export type FilteredSnapsProps = {
  order?: Order | undefined;
  category?: RegistrySnapCategory | undefined;
  limit?: number | undefined;
  excluded?: string[] | undefined;
};

export const FilteredSnaps: FunctionComponent<FilteredSnapsProps> = ({
  order,
  category,
  limit,
  excluded = [],
}) => {
  const snaps = useSelector(
    getSnapsByFilter({
      order,
      category,
      limit,
      excluded,
    }),
  );

  if (!snaps) {
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
