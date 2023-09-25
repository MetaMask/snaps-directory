import type { MessageDescriptor } from '@lingui/core';
import { defineMessage } from '@lingui/macro';

import type { IconName } from './components';

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
