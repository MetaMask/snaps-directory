import { defineMessage } from '@lingui/macro';

import {
  InteroperabilityIcon,
  NotificationsCategoryIcon,
  TransactionInsightsIcon,
} from '../../components/icons';
import { RegistrySnapCategory } from '../../constants';

export const SNAP_CATEGORY_ICONS = {
  [RegistrySnapCategory.Interoperability]: InteroperabilityIcon,
  [RegistrySnapCategory.Notifications]: NotificationsCategoryIcon,
  [RegistrySnapCategory.TransactionInsights]: TransactionInsightsIcon,
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
  [Order.Popularity]: defineMessage`Popularity`,
  [Order.Latest]: defineMessage`Latest`,
};
