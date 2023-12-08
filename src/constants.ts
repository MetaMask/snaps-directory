import type { MessageDescriptor } from '@lingui/core';
import { defineMessage } from '@lingui/macro';

export enum RegistrySnapCategory {
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
  [RegistrySnapCategory.Interoperability]: {
    name: defineMessage`Interoperability`,
    description: defineMessage`Connect to non-Ethereum blockchains with MetaMask.`,
  },
  [RegistrySnapCategory.Notifications]: {
    name: defineMessage`Communication`,
    description: defineMessage`Stay in the know with notifications and chat directly in MetaMask.`,
  },
  [RegistrySnapCategory.TransactionInsights]: {
    name: defineMessage`Security`,
    description: defineMessage`Guard your wallet with transaction insights and safety tools.`,
  },
};

export const SNAP_CATEGORY_LINKS: Record<
  RegistrySnapCategory,
  {
    header: MessageDescriptor;
    link: string;
    linkText: MessageDescriptor;
  }
> = {
  [RegistrySnapCategory.Interoperability]: {
    header: defineMessage`Use MetaMask Beyond Ethereum`,
    link: '/interoperability',
    linkText: defineMessage`See All`,
  },
  [RegistrySnapCategory.Notifications]: {
    header: defineMessage`Notifications and Chat`,
    link: '/notifications',
    linkText: defineMessage`See All`,
  },
  [RegistrySnapCategory.TransactionInsights]: {
    header: defineMessage`Guard Your Wallet`,
    link: '/transaction-insights',
    linkText: defineMessage`See All`,
  },
};
