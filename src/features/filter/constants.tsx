import { defineMessage } from '@lingui/macro';

import { Order } from './store';
import {
  InteroperabilityIcon,
  NotificationsIcon,
  TransactionInsightsIcon,
} from '../../components';
import { RegistrySnapCategory } from '../../constants';

export const SNAP_CATEGORY_ICONS = {
  [RegistrySnapCategory.Interoperability]: InteroperabilityIcon,
  [RegistrySnapCategory.Notifications]: NotificationsIcon,
  [RegistrySnapCategory.TransactionInsights]: TransactionInsightsIcon,
};

export const SNAP_ORDER_LABELS = {
  [Order.Random]: defineMessage`Random`,
  [Order.Alphabetical]: defineMessage`Alphabetical`,
};
