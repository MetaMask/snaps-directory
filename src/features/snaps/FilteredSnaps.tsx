import { SimpleGrid } from '@chakra-ui/react';
import { useEffect, useState, type FunctionComponent } from 'react';

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
  images?: boolean | undefined;
};

export const FilteredSnaps: FunctionComponent<FilteredSnapsProps> = ({
  order,
  category,
  limit,
  excluded,
  images,
}) => {
  const snaps = useSelector(
    getSnapsByFilter({
      order,
      category,
      limit,
      excluded,
    }),
  );

  const [memoizedSnaps, setMemoizedSnaps] = useState(snaps);

  useEffect(() => {
    if (!memoizedSnaps) {
      // We effectively memoize the selector, since for certain orders the output
      // is non deterministic and but we don't want it changing every re-render.
      setMemoizedSnaps(snaps);
    }
  }, [snaps, memoizedSnaps]);

  if (!memoizedSnaps) {
    return <LoadingGrid />;
  }

  return (
    <SimpleGrid columns={[1, null, 2, 3]} spacing={4} marginX="-0.5rem">
      {memoizedSnaps.map((snap, index) => (
        <SnapCard key={`${snap.id}-${index}`} image={images} {...snap} />
      ))}
    </SimpleGrid>
  );
};
