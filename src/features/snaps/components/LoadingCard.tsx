import { SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { Card } from '../../../components/Card';

export const LoadingCard: FunctionComponent = () => (
  <Card>
    <SkeletonCircle size="10" />
    <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
  </Card>
);
