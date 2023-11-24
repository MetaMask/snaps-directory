import { Flex, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { Card } from '../../../components';

export const LoadingCard: FunctionComponent = () => (
  <Card data-testid="loading-card">
    <Flex gap="2" alignItems="center">
      <SkeletonCircle size="10" />
      <SkeletonText noOfLines={2} spacing="4" skeletonHeight="2" width="70%" />
    </Flex>
  </Card>
);
