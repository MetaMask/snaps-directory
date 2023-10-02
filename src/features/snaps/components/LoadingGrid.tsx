import { SimpleGrid } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { LoadingCard } from './LoadingCard';

export const LoadingGrid: FunctionComponent = () => (
  <SimpleGrid columns={[1, null, 2, 3]} spacing={4} data-testid="loading-grid">
    {[...Array(6)].map((_, index) => (
      <LoadingCard key={index} />
    ))}
  </SimpleGrid>
);
