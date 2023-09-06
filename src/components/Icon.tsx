import type { PropsOf } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import type { ForwardRefExoticComponent } from 'react';
import { forwardRef } from 'react';

import backIcon from '../assets/icons/back.svg';
import checkIcon from '../assets/icons/check.svg';
import externalLinkMutedIcon from '../assets/icons/external-link-muted.svg';
import externalLinkIcon from '../assets/icons/external-link.svg';
import metamaskIcon from '../assets/icons/metamask.svg';
import searchIcon from '../assets/icons/search.svg';
import snapMutedIcon from '../assets/icons/snap-muted.svg';
import snapIcon from '../assets/icons/snap.svg';

const DEFAULT_ICONS = {
  back: {
    alt: t`Back`,
    src: backIcon,
  },
  check: {
    alt: t`Check`,
    src: checkIcon,
  },
  metamask: {
    alt: t`MetaMask`,
    src: metamaskIcon,
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
