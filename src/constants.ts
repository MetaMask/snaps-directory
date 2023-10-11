import type { MessageDescriptor } from '@lingui/core';
import { defineMessage } from '@lingui/macro';

export enum RegistrySnapCategory {
  AccountManagement = 'account management',
  Interoperability = 'interoperability',
  Notifications = 'notifications',
  TransactionInsights = 'transaction insights',
}

export const SNAP_CATEGORY_LABELS: Record<
  RegistrySnapCategory,
  {
    name: MessageDescriptor;
    description: MessageDescriptor;
  }
> = {
  [RegistrySnapCategory.AccountManagement]: {
    name: defineMessage`Account Management`,
    description: defineMessage`Manage your accounts and keys with MetaMask.`,
  },
  [RegistrySnapCategory.Interoperability]: {
    name: defineMessage`Interoperability`,
    description: defineMessage`Connect to non-Ethereum blockchains with MetaMask.`,
  },
  [RegistrySnapCategory.Notifications]: {
    name: defineMessage`Notifications`,
    description: defineMessage`Stay in the know with web3 notifications directly in MetaMask.`,
  },
  [RegistrySnapCategory.TransactionInsights]: {
    name: defineMessage`Transaction Insights`,
    description: defineMessage`Stay informed with insights before you confirm transactions in MetaMask.`,
  },
};
