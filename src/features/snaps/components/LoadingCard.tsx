import { SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { Card } from '../../../components';

export const LoadingCard: FunctionComponent = () => (
  <Card data-testid="loading-card">
    <SkeletonCircle size="10" />
    <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
  </Card>
);
