import type { BoxProps } from '@chakra-ui/react';
import { Avatar, Box } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { SnapIcon } from './icons';

export type SnapIconProps = BoxProps & {
  snapName: string;
  isInstalled: boolean;
  icon?: string | undefined;
  size?: string;
  badgeSize?: string;
};

/**
 * A Snap icon, which renders the icon defined in the snap's manifest, or a
 * fallback icon if the snap doesn't define one.
 *
 * @param props - The props.
 * @param props.snapName - The name of the snap.
 * @param props.icon - The SVG icon defined in the snap's manifest.
 * @param props.isInstalled - Whether the snap is installed or not.
 * @param props.size - The size of the icon.
 * @param props.badgeSize - The size of the badge.
 * @returns The Snap icon component.
 */
export const SnapAvatar: FunctionComponent<SnapIconProps> = ({
  snapName,
  icon,
  isInstalled,
  size = '3rem',
  badgeSize = '1.5rem',
  ...props
}) => {
  return (
    <Box position="relative" {...props}>
      <Avatar
        src={icon as string}
        name={snapName.slice(0, 1).toUpperCase()}
        fontSize="md"
        background="white"
        color="text.alternative"
        size="md"
        width={size}
        height={size}
        margin="1"
        sx={{
          img: {
            // This solves an issue where the avatar is slightly bigger than the
            // Snap icon, causing it to render a weird border.
            transform: 'scale(1.01)',
          },
        }}
      />
      <SnapIcon
        width={badgeSize}
        height={badgeSize}
        position="absolute"
        bottom="0"
        right="0"
        fill={isInstalled ? '#0376C9' : '#6A737D'}
        data-testid="snap-icon"
      />
    </Box>
  );
};
