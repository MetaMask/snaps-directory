import type { MessageDescriptor } from '@lingui/core';
import { defineMessage } from '@lingui/macro';

import type { IconName } from './components';

export const SNAPS_REGISTRY_URL =
  'https://acl.execution.metamask.io/latest/registry.json';

export enum RegistrySnapCategory {
  Interoperability = 'interoperability',
  Notifications = 'notifications',
  TransactionInsights = 'transaction insights',
}

export const SNAP_CATEGORY_LABELS: Record<
  RegistrySnapCategory,
  { name: MessageDescriptor; icon: IconName; description: MessageDescriptor }
> = {
  [RegistrySnapCategory.Interoperability]: {
    name: defineMessage`Interoperability`,
    icon: 'interoperability',
    description: defineMessage`Connect to non-Ethereum blockchains with MetaMask.`,
  },
  [RegistrySnapCategory.Notifications]: {
    name: defineMessage`Notifications`,
    icon: 'notifications',
    description: defineMessage`Stay in the know with web3 notifications directly in MetaMask.`,
  },
  [RegistrySnapCategory.TransactionInsights]: {
    name: defineMessage`Transaction Insights`,
    icon: 'transactionInsights',
    description: defineMessage`Stay informed with insights before you confirm transactions in MetaMask.`,
  },
};
