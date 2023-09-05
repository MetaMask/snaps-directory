import { Text } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import type { IconName } from './Icon';

export enum RegistrySnapCategory {
  Interoperability = 'interoperability',
  Notifications = 'notifications',
  TransactionInsights = 'transaction insights',
}

export const SNAP_CATEGORY_LABELS: Record<
  RegistrySnapCategory,
  { name: string; icon: IconName }
> = {
  [RegistrySnapCategory.Interoperability]: {
    name: 'Interoperability',
    icon: 'interoperability',
  },
  [RegistrySnapCategory.Notifications]: {
    name: 'Notifications',
    icon: 'notifications',
  },
  [RegistrySnapCategory.TransactionInsights]: {
    name: 'Transaction insights',
    icon: 'transactionInsights',
  },
};

export type SnapCategoryProps = {
  category: RegistrySnapCategory;
};

export const SnapCategory: FunctionComponent<SnapCategoryProps> = ({
  category,
}) => <Text>{SNAP_CATEGORY_LABELS[category].name}</Text>;
