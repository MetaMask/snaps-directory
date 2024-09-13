import type { MessageDescriptor } from '@lingui/core';
import { defineMessage } from '@lingui/macro';

export enum RegistrySnapCategory {
  AccountManagement = 'account management',
  Interoperability = 'interoperability',
  Communication = 'communication',
  Security = 'security',
  NameResolution = 'name resolution',
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
  [RegistrySnapCategory.Communication]: {
    name: defineMessage`Communication`,
    description: defineMessage`Stay in the know with notifications and chat directly in MetaMask.`,
  },
  [RegistrySnapCategory.Security]: {
    name: defineMessage`Security`,
    description: defineMessage`Guard your wallet with transaction insights and safety tools.`,
  },
  [RegistrySnapCategory.NameResolution]: {
    name: defineMessage`Name Resolution`,
    description: defineMessage`Resolve human-readable names to blockchain addresses.`,
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
  [RegistrySnapCategory.AccountManagement]: {
    header: defineMessage`Create an Ethereum Account`,
    link: '/account-management',
    linkText: defineMessage`See All`,
  },
  [RegistrySnapCategory.Interoperability]: {
    header: defineMessage`Use MetaMask Beyond Ethereum`,
    link: '/interoperability',
    linkText: defineMessage`See All`,
  },
  [RegistrySnapCategory.Communication]: {
    header: defineMessage`Notifications and Chat`,
    link: '/communication',
    linkText: defineMessage`See All`,
  },
  [RegistrySnapCategory.Security]: {
    header: defineMessage`Guard Your Wallet`,
    link: '/security',
    linkText: defineMessage`See All`,
  },
  [RegistrySnapCategory.NameResolution]: {
    header: defineMessage`Resolve Names to Addresses`,
    link: '/name-resolution',
    linkText: defineMessage`See All`,
  },
};
