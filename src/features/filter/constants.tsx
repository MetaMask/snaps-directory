import { defineMessage } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import {
  InteroperabilityIcon,
  MetaMaskIcon,
  NotificationsIcon,
  TransactionInsightsIcon,
} from '../../components/icons';
import { RegistrySnapCategory } from '../../constants';

export const SNAP_CATEGORY_ICONS: Record<
  RegistrySnapCategory,
  FunctionComponent
> = {
  [RegistrySnapCategory.AccountManagement]: MetaMaskIcon,
  [RegistrySnapCategory.Interoperability]: InteroperabilityIcon,
  [RegistrySnapCategory.Notifications]: NotificationsIcon,
  [RegistrySnapCategory.TransactionInsights]: TransactionInsightsIcon,
};

export enum Order {
  Popularity = 'popularity',
  Alphabetical = 'name',
}

export const SNAP_ORDER_LABELS = {
  [Order.Alphabetical]: defineMessage`Alphabetical`,
  [Order.Popularity]: defineMessage`Popularity`,
};
