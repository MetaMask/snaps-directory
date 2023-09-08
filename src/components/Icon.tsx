import type { PropsOf } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import type { MessageDescriptor } from '@lingui/core';
import { defineMessage } from '@lingui/macro';
import { useLingui } from '@lingui/react';
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
    alt: defineMessage`Back`,
    src: backIcon,
  },
  check: {
    alt: defineMessage`Check`,
    src: checkIcon,
  },
  checkBlue: {
    alt: defineMessage`Check`,
    src: checkBlueIcon,
  },
  metamask: {
    alt: defineMessage`MetaMask`,
    src: metamaskIcon,
  },
  dropdown: {
    alt: defineMessage`Dropdown`,
    src: dropdownIcon,
  },
  interoperability: {
    alt: defineMessage`Interoperability`,
    src: interoperabilityIcon,
  },
  interoperabilityOutline: {
    alt: defineMessage`Interoperability`,
    src: interoperabilityOutlineIcon,
  },
  notifications: {
    alt: defineMessage`Notifications`,
    src: notificationsIcon,
  },
  notificationsOutline: {
    alt: defineMessage`Notifications`,
    src: notificationsOutlineIcon,
  },
  search: {
    alt: defineMessage`Search`,
    src: searchIcon,
  },
  snap: {
    alt: defineMessage`Snap`,
    src: snapIcon,
  },
  snapMuted: {
    alt: defineMessage`Snap`,
    src: snapMutedIcon,
  },
  transactionInsights: {
    alt: defineMessage`Transaction Insights`,
    src: transactionInsightsIcon,
  },
  transactionInsightsOutline: {
    alt: defineMessage`Transaction Insights`,
    src: transactionInsightsOutlineIcon,
  },
  externalLink: {
    alt: defineMessage`External Link`,
    src: externalLinkIcon,
  },
  externalLinkMuted: {
    alt: defineMessage`External Link`,
    src: externalLinkMutedIcon,
  },
};

export type IconName = keyof typeof DEFAULT_ICONS;

export type IconProps = {
  icon: IconName;
  alt?: MessageDescriptor;
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
    const { i18n } = useLingui();
    const iconMetadata = DEFAULT_ICONS[icon];

    return (
      <Image
        ref={ref}
        src={iconMetadata.src}
        alt={i18n._(alt)}
        width={width}
        height={height}
        {...props}
      />
    );
  },
);
