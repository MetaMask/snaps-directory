import { Text } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

export enum RegistrySnapCategory {
  Interoperability = 'interoperability',
  Notifications = 'notifications',
  TransactionInsights = 'transaction insights',
}

export const SNAP_CATEGORY_LABELS: Record<RegistrySnapCategory, string> = {
  [RegistrySnapCategory.Interoperability]: 'Interoperability',
  [RegistrySnapCategory.Notifications]: 'Notifications',
  [RegistrySnapCategory.TransactionInsights]: 'Transaction Insights',
};

export type SnapCategoryProps = {
  category: RegistrySnapCategory;
};

export const SnapCategory: FunctionComponent<SnapCategoryProps> = ({
  category,
}) => <Text>{SNAP_CATEGORY_LABELS[category]}</Text>;
