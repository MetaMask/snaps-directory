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
