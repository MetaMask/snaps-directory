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
  Random = 'random',
  Alphabetical = 'name',
  Popularity = 'popularity',
}

export const SNAP_ORDER_LABELS = {
  [Order.Random]: defineMessage`Random`,
  [Order.Alphabetical]: defineMessage`Alphabetical`,
  [Order.Popularity]: defineMessage`Popularity`,
};
