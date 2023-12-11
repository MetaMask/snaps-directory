import type { MessageDescriptor } from '@lingui/core';
import { defineMessage } from '@lingui/macro';
import type { InitialPermissions } from '@metamask/snaps-sdk';
import type { FunctionComponent } from 'react';

import type { IconProps } from '../../components';
import {
  WifiIcon,
  SearchIcon,
  UserCircleAddIcon,
  HierarchyIcon,
  ExploreIcon,
  SpeedometerIcon,
  DocumentCodeIcon,
  FlashIcon,
  AddSquareIcon,
  KeyIcon,
  SecurityKeyIcon,
  MessagesIcon,
  NotificationIcon,
  SecuritySearchIcon,
  ClockIcon,
} from '../../components';
import type { Fields } from '../../utils';

export type PermissionsSnap = Fields<
  Queries.Snap,
  | 'name'
  | 'icon'
  | 'snapId'
  | 'description'
  | 'latestVersion'
  | 'website'
  | 'onboard'
  | 'category'
  | 'author'
  | 'sourceCode'
  | 'audits'
  | 'banner'
  | 'support'
>;

// Note that we have to define the `PermissionsKey` type separately, since
// TypeScript doesn't enforce that the keys are present otherwise.
type PermissionsKey = Exclude<keyof InitialPermissions, 'snap_confirm'>;

type PermissionDescriptor = {
  label: MessageDescriptor;
  description: MessageDescriptor;
  icon: FunctionComponent<IconProps>;
  weight: number;
};

type PermissionFunction<Permission extends PermissionsKey> = (
  snap: PermissionsSnap,
  permission: Exclude<InitialPermissions[Permission], undefined>,
) => PermissionDescriptor | PermissionDescriptor[];

type PermissionsMap = {
  [Key in PermissionsKey]: PermissionFunction<Key>;
};

// TODO: Add `eth_accounts` permission.
// TODO: Add `snap_getLocale` permission.
// TODO: Add `endowment:ethereum-provider` permission.
// TODO: Add `endowment:lifecycle-hooks` permission.
// TODO: Add `endowment:page-home` permission.
export const SNAP_PERMISSIONS: PermissionsMap = {
  'endowment:cronjob': ({ name }) => ({
    label: defineMessage`Schedule and execute periodic actions`,
    description: defineMessage`Allow ${name} to perform actions that run periodically at fixed times, dates, or intervals. This can be used to trigger time-sensitive interactions or notifications.`,
    icon: ClockIcon,
    weight: 3,
  }),
  'endowment:keyring': ({ name }) => ({
    label: defineMessage`Allow requests for adding and controlling Ethereum accounts`,
    description: defineMessage`Let ${name} receive requests to add or remove accounts, plus sign and transact on behalf of these accounts.`,
    icon: UserCircleAddIcon,
    weight: 3,
  }),
  'endowment:name-lookup': ({ name }) => ({
    label: defineMessage`Provide domain and address lookups`,
    description: defineMessage`Allow ${name} to fetch and display address and domain lookups in different parts of the MetaMask UI.`,
    icon: SearchIcon,
    weight: 4,
  }),
  'endowment:network-access': ({ name }) => ({
    label: defineMessage`Access the internet`,
    description: defineMessage`Allow ${name} to access the internet. This can be used to both send and receive data with third-party servers.`,
    icon: WifiIcon,
    weight: 3,
  }),
  'endowment:rpc': ({ name }, permission) => {
    const result: PermissionDescriptor[] = [];

    const shared = {
      icon: HierarchyIcon,
      weight: 3,
    };

    if (permission?.snaps) {
      result.push({
        label: defineMessage`Allow other Snaps to communicate directly with ${name}`,
        description: defineMessage`Allow other Snaps to send messages to ${name} and receive a response from ${name}.`,
        ...shared,
      });
    }

    if (permission?.dapps) {
      result.push({
        label: defineMessage`Allow websites to communicate with ${name}`,
        description: defineMessage`Allow websites to send messages to website and receive a response from ${name}.`,
        ...shared,
      });
    }

    if (permission?.allowedOrigins) {
      for (const origin of permission.allowedOrigins) {
        result.push({
          label: defineMessage`Allow ${origin} to communicate with ${name}`,
          description: defineMessage`Allow ${origin} to send messages to ${name} and receive a response from ${name}.`,
          ...shared,
        });
      }
    }

    return result;
  },
  'endowment:transaction-insight': ({ name }, permission) => {
    const result: PermissionDescriptor[] = [];

    result.push({
      label: defineMessage`Fetch and display transaction insights`,
      description: defineMessage`Allow ${name} to decode transactions and show insights within the MetaMask UI. This can be used for anti-phishing and security solutions.`,
      icon: SpeedometerIcon,
      weight: 4,
    });

    if (permission.allowTransactionOrigin) {
      result.push({
        label: defineMessage`See the origins of websites that suggest transactions`,
        description: defineMessage`Allow ${name} to see the origin (URI) of websites that suggest transactions. This can be used for anti-phishing and security solutions.`,
        icon: ExploreIcon,
        weight: 4,
      });
    }

    return result;
  },
  'endowment:webassembly': ({ name }) => ({
    label: defineMessage`Support for WebAssembly`,
    description: defineMessage`Allow ${name} to access low-level execution environments via WebAssembly.`,
    icon: DocumentCodeIcon,
    weight: 3,
  }),
  /* eslint-disable @typescript-eslint/naming-convention */
  snap_dialog: ({ name }) => ({
    label: defineMessage`Display dialog windows in MetaMask`,
    description: defineMessage`Allow ${name} to display MetaMask popups with custom text, input field, and buttons to approve or reject an action. Can be used to create e.g., alerts, confirmations, and opt-in flows for a Snap.`,
    icon: MessagesIcon,
    weight: 4,
  }),
  snap_getBip32Entropy: ({ name }) => ({
    // TODO: Get network name.
    label: defineMessage`Manage $1 accounts`,
    description: defineMessage`Allow ${name} to manage accounts and assets on the requested network. These accounts are derived and backed up using your secret recovery phrase (without revealing it). With the power to derive keys, ${name} can support a variety of blockchain protocols beyond Ethereum (EVMs).`,
    icon: KeyIcon,
    weight: 1,
  }),
  snap_getBip44Entropy: ({ name }) => ({
    // TODO: Get network name.
    label: defineMessage`Manage $1 accounts`,
    description: defineMessage`Allow ${name} to manage accounts and assets on the requested network. These accounts are derived and backed up using your secret recovery phrase (without revealing it). With the power to derive keys, ${name} can support a variety of blockchain protocols beyond Ethereum (EVMs).`,
    icon: KeyIcon,
    weight: 1,
  }),
  snap_getBip32PublicKey: ({ name }) => ({
    // TODO: Get network name.
    label: defineMessage`View your public key for $1`,
    description: defineMessage`Allow ${name} to view your public keys (and addresses) for $1. This does not grant any control of accounts or assets.`,
    icon: SecuritySearchIcon,
    weight: 2,
  }),
  snap_getEntropy: ({ name }) => ({
    label: defineMessage`Derive arbitrary keys unique to ${name}`,
    description: defineMessage`Allow ${name} to derive arbitrary keys unique to ${name}, without exposing them. These keys are separate from your MetaMask account(s) and not related to your private keys or Secret Recovery Phrase. Other snaps cannot access this information.`,
    icon: SecurityKeyIcon,
    weight: 4,
  }),
  snap_manageAccounts: ({ name }) => ({
    label: defineMessage`Add and control Ethereum accounts`,
    description: defineMessage`Allow ${name} to add or remove Ethereum accounts, then transact and sign with these accounts.`,
    icon: UserCircleAddIcon,
    weight: 3,
  }),
  snap_manageState: ({ name }) => ({
    label: defineMessage`Store and manage its data on your device`,
    description: defineMessage`Allow ${name} to store, update, and retrieve data securely with encryption. Other Snaps cannot access this information.`,
    icon: AddSquareIcon,
    weight: 4,
  }),
  snap_notify: ({ name }) => ({
    label: defineMessage`Show notifications`,
    description: defineMessage`Allow ${name} to display notifications within MetaMask. A short notification text can be triggered by a Snap for actionable or time-sensitive information.`,
    icon: NotificationIcon,
    weight: 4,
  }),
  wallet_snap: (_, permissions) => {
    const permission = permissions.wallet_snap;

    if (permission) {
      Object.keys(permission).map((snapId) => ({
        // TODO: Get friendly name for `snapId`.
        label: defineMessage`Connect to ${snapId}`,
        description: defineMessage`Allow the Snap to interact with ${snapId}.`,
        icon: FlashIcon,
        weight: 4,
      }));
    }

    return [];
  },
  /* eslint-enable @typescript-eslint/naming-convention */
};

/**
 * Get the permission descriptors for a Snap.
 *
 * @param snap - The Snap to get the permissions for.
 * @param permissions - The permissions to get the descriptors for.
 * @returns The permission descriptors.
 */
export function getPermissions(
  snap: PermissionsSnap,
  permissions: InitialPermissions,
): PermissionDescriptor[] {
  return Object.entries(permissions)
    .reduce<PermissionDescriptor[]>((result, [key, value]) => {
      const permission = SNAP_PERMISSIONS[key as PermissionsKey];

      if (permission) {
        // TODO: Fix `any` type if possible.
        const descriptors = permission(snap, value as any);

        if (Array.isArray(descriptors)) {
          return [...result, ...descriptors];
        }

        return [...result, descriptors];
      }

      return result;
    }, [])
    .sort((a, b) => a.weight - b.weight);
}
