import { Text } from '@chakra-ui/react';
import type { MessageDescriptor } from '@lingui/core';
import { defineMessage } from '@lingui/macro';
import { Trans } from '@lingui/react';
import type { FunctionComponent } from 'react';

import type { IconName } from './Icon';

export enum RegistrySnapCategory {
  Interoperability = 'interoperability',
  Notifications = 'notifications',
  TransactionInsights = 'transaction insights',
}

export const SNAP_CATEGORY_LABELS: Record<
  RegistrySnapCategory,
  { name: MessageDescriptor; icon: IconName }
> = {
  [RegistrySnapCategory.Interoperability]: {
    name: defineMessage`Interoperability`,
    icon: 'interoperability',
  },
  [RegistrySnapCategory.Notifications]: {
    name: defineMessage`Notifications`,
    icon: 'notifications',
  },
  [RegistrySnapCategory.TransactionInsights]: {
    name: defineMessage`Transaction Insights`,
    icon: 'transactionInsights',
  },
};

export type SnapCategoryProps = {
  category: RegistrySnapCategory;
};

export const SnapCategory: FunctionComponent<SnapCategoryProps> = ({
  category,
}) => (
  <Text>
    <Trans id={SNAP_CATEGORY_LABELS[category].name.id} />
  </Text>
);
