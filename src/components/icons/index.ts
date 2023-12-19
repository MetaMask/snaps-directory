import { defineMessage } from '@lingui/macro';

import BaseBackIcon from './back.svg';
import BaseCheckThinIcon from './check-thin.svg';
import BaseCheckIcon from './check.svg';
import BaseCloseIcon from './close.svg';
import BaseDarkModeIcon from './dark-mode.svg';
import BaseDotIcon from './dot.svg';
import BaseDropdownIcon from './dropdown.svg';
import BaseExternalLinkIcon from './external-link.svg';
import BaseFilterIcon from './filter.svg';
import { wrapIcon } from './Icon';
import BaseInteroperabilityIcon from './interoperability.svg';
import BaseLightModeIcon from './light-mode.svg';
import BaseLiveIcon from './live.svg';
import BaseMetaMaskIcon from './metamask.svg';
import BaseNotificationsIcon from './notifications.svg';
import BaseSearchIcon from './search.svg';
import BaseSnapIcon from './snap.svg';
import BaseTransactionInsightsIcon from './transaction-insights.svg';

export const BackIcon = wrapIcon(BaseBackIcon, defineMessage`Back`);

export const CloseIcon = wrapIcon(BaseCloseIcon, defineMessage`Close`);

export const CheckIcon = wrapIcon(BaseCheckIcon, defineMessage`Check`);

export const CheckThinIcon = wrapIcon(BaseCheckThinIcon, defineMessage`Check`);

export const DarkModeIcon = wrapIcon(
  BaseDarkModeIcon,
  defineMessage`Enable dark mode`,
);

export const DotIcon = wrapIcon(
  BaseDotIcon,
  defineMessage`Unread notification`,
);

export const DropdownIcon = wrapIcon(BaseDropdownIcon, defineMessage`Dropdown`);

export const ExternalLinkIcon = wrapIcon(
  BaseExternalLinkIcon,
  defineMessage`External link`,
);

export const FilterIcon = wrapIcon(BaseFilterIcon, defineMessage`Filter`);

export const InteroperabilityIcon = wrapIcon(
  BaseInteroperabilityIcon,
  defineMessage`Interoperability`,
);

export const LightModeIcon = wrapIcon(
  BaseLightModeIcon,
  defineMessage`Enable light mode`,
);

export const LiveIcon = wrapIcon(BaseLiveIcon, defineMessage`Live`);

export const MetaMaskIcon = wrapIcon(BaseMetaMaskIcon, defineMessage`MetaMask`);

export const NotificationsIcon = wrapIcon(
  BaseNotificationsIcon,
  defineMessage`Notifications`,
);

export const NotificationsCategoryIcon = wrapIcon(
  BaseNotificationsIcon,
  defineMessage`Communication`,
);

export const SearchIcon = wrapIcon(BaseSearchIcon, defineMessage`Search`);

export const SnapIcon = wrapIcon(BaseSnapIcon, defineMessage`Snap`);

export const TransactionInsightsIcon = wrapIcon(
  BaseTransactionInsightsIcon,
  defineMessage`Security`,
);

export type { IconProps } from './Icon';
