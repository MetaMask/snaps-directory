import type { PropsOf } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import type { ForwardRefExoticComponent } from 'react';
import { forwardRef } from 'react';

import backIcon from '../assets/icons/back.svg';
import checkBlueIcon from '../assets/icons/check-blue.svg';
import checkIcon from '../assets/icons/check.svg';
import dropdownIcon from '../assets/icons/dropdown.svg';
import externalLinkMutedIcon from '../assets/icons/external-link-muted.svg';
import externalLinkIcon from '../assets/icons/external-link.svg';
import interoperabilityOutlineIcon from '../assets/icons/interoperability-outline.svg';
import interoperabilityIcon from '../assets/icons/interoperability.svg';
import metamaskIcon from '../assets/icons/metamask.svg';
import notificationsOutlineIcon from '../assets/icons/notifications-outline.svg';
import notificationsIcon from '../assets/icons/notifications.svg';
import searchIcon from '../assets/icons/search.svg';
import snapMutedIcon from '../assets/icons/snap-muted.svg';
import snapIcon from '../assets/icons/snap.svg';
import transactionInsightsOutlineIcon from '../assets/icons/transaction-insights-outline.svg';
import transactionInsightsIcon from '../assets/icons/transaction-insights.svg';

const DEFAULT_ICONS = {
  back: {
    alt: t`Back`,
    src: backIcon,
  },
  check: {
    alt: t`Check`,
    src: checkIcon,
  },
  checkBlue: {
    alt: t`Check`,
    src: checkBlueIcon,
  },
  metamask: {
    alt: t`MetaMask`,
    src: metamaskIcon,
  },
  dropdown: {
    alt: t`Dropdown`,
    src: dropdownIcon,
  },
  interoperability: {
    alt: t`Interoperability`,
    src: interoperabilityIcon,
  },
  interoperabilityOutline: {
    alt: t`Interoperability`,
    src: interoperabilityOutlineIcon,
  },
  notifications: {
    alt: t`Notifications`,
    src: notificationsIcon,
  },
  notificationsOutline: {
    alt: t`Notifications`,
    src: notificationsOutlineIcon,
  },
  search: {
    alt: t`Search`,
    src: searchIcon,
  },
  snap: {
    alt: t`Snap`,
    src: snapIcon,
  },
  snapMuted: {
    alt: t`Snap`,
    src: snapMutedIcon,
  },
  transactionInsights: {
    alt: t`Transaction Insights`,
    src: transactionInsightsIcon,
  },
  transactionInsightsOutline: {
    alt: t`Transaction Insights`,
    src: transactionInsightsOutlineIcon,
  },
  externalLink: {
    alt: t`External Link`,
    src: externalLinkIcon,
  },
  externalLinkMuted: {
    alt: t`External Link`,
    src: externalLinkMutedIcon,
  },
};

export type IconName = keyof typeof DEFAULT_ICONS;

export type IconProps = {
  icon: IconName;
  alt?: string;
  width?: string;
  height?: string;
} & PropsOf<typeof Image>;

/**
 * Icon component, which renders one of the predefined icons.
 *
 * The component is based on Chakra UI's {@link Image} component, so all props
 * supported by {@link Image} are also supported by this component.
 *
 * @param props - Icon props.
 * @param props.icon - The name of the icon, e.g. 'alert'.
 * @param props.alt - The alt text for the icon.
 * @param props.width - The width of the icon. Defaults to '32px'.
 * @param props.height - The height of the icon. Defaults to '32px'.
 * @returns The icon component.
 */
export const Icon: ForwardRefExoticComponent<IconProps> = forwardRef(
  (
    {
      icon,
      alt = DEFAULT_ICONS[icon].alt,
      width = '32px',
      height = width,
      ...props
    },
    ref,
  ) => {
    const iconMetadata = DEFAULT_ICONS[icon];
    return (
      <Image
        ref={ref}
        src={iconMetadata.src}
        alt={alt}
        width={width}
        height={height}
        {...props}
      />
    );
  },
);
