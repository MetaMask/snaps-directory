import { SimpleGrid } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import type { RegistrySnapCategory } from '../../constants';
import { useSelector } from '../../hooks';
import { SORT_FUNCTIONS } from '../filter';
import { Order } from '../filter/constants';
import { getSnaps } from '../snaps';
import { LoadingGrid, SnapCard } from '../snaps/components';

export type FilteredSnapsProps = {
  order?: Order;
  category?: RegistrySnapCategory | null;
  limit?: number;
};

export const FilteredSnaps: FunctionComponent<FilteredSnapsProps> = ({
  order,
  category,
  limit,
}) => {
  const snaps = useSelector(getSnaps);

  if (!snaps) {
    return <LoadingGrid />;
  }

  const filteredSnaps = snaps.filter(
    (snap) => !category || snap.category === category,
  );

  const sortedSnaps = SORT_FUNCTIONS[order ?? Order.Popularity](filteredSnaps);

  return (
    <SimpleGrid columns={[1, null, 2, 3]} spacing={4}>
      {sortedSnaps.slice(0, limit).map((snap, index) => (
        <SnapCard key={`${snap.id}-${index}`} {...snap} />
      ))}
    </SimpleGrid>
  );
};
