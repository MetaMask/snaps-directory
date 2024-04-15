import { defineMessage } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import {
  InteroperabilityIcon,
  NotificationsCategoryIcon,
  AddUserIcon,
  TransactionInsightsIcon,
} from '../../components/icons';
import { RegistrySnapCategory } from '../../constants';

export const SNAP_CATEGORY_ICONS: Record<
  RegistrySnapCategory,
  FunctionComponent
> = {
  [RegistrySnapCategory.AccountManagement]: AddUserIcon,
  [RegistrySnapCategory.Interoperability]: InteroperabilityIcon,
  [RegistrySnapCategory.Communication]: NotificationsCategoryIcon,
  [RegistrySnapCategory.Security]: TransactionInsightsIcon,
};

export enum Order {
  Popularity = 'popularity',
  Alphabetical = 'name',
  Random = 'random',
  DeterministicRandom = 'deterministicRandom',
  Latest = 'latest',
  Search = 'search',
}

export const SNAP_ORDER_LABELS = {
  [Order.Alphabetical]: defineMessage`Alphabetical`,
  [Order.Popularity]: defineMessage`Most Popular`,
  [Order.Latest]: defineMessage`Latest`,
};
