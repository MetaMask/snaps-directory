import { defineMessage } from '@lingui/macro';

import {
  InteroperabilityIcon,
  NotificationsIcon,
  TransactionInsightsIcon,
} from '../../components/icons';
import { RegistrySnapCategory } from '../../constants';

export const SNAP_CATEGORY_ICONS = {
  [RegistrySnapCategory.Interoperability]: InteroperabilityIcon,
  [RegistrySnapCategory.Notifications]: NotificationsIcon,
  [RegistrySnapCategory.TransactionInsights]: TransactionInsightsIcon,
};

export enum Order {
  Popularity = 'popularity',
  Alphabetical = 'name',
  Random = 'random',
  RandomConsistent = 'randomConsistent',
  Latest = 'latest',
}

export const SNAP_ORDER_LABELS = {
  [Order.Alphabetical]: defineMessage`Alphabetical`,
  [Order.Popularity]: defineMessage`Popularity`,
  [Order.Latest]: defineMessage`Latest`,
};
