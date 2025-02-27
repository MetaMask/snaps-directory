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
    name: defineMessage`Account management`,
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
    name: defineMessage`Name resolution`,
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
    header: defineMessage`Create an Ethereum account`,
    link: '/account-management',
    linkText: defineMessage`See all`,
  },
  [RegistrySnapCategory.Interoperability]: {
    header: defineMessage`Use MetaMask beyond Ethereum`,
    link: '/interoperability',
    linkText: defineMessage`See all`,
  },
  [RegistrySnapCategory.Communication]: {
    header: defineMessage`Notifications and chat`,
    link: '/communication',
    linkText: defineMessage`See all`,
  },
  [RegistrySnapCategory.Security]: {
    header: defineMessage`Guard your wallet`,
    link: '/security',
    linkText: defineMessage`See all`,
  },
  [RegistrySnapCategory.NameResolution]: {
    header: defineMessage`Human-readable addresses onchain`,
    link: '/name-resolution',
    linkText: defineMessage`See all`,
  },
};
