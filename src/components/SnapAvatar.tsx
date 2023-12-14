import type { BoxProps, ResponsiveValue } from '@chakra-ui/react';
import { Avatar, Box } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { SnapIcon } from './icons';

export type SnapIconProps = BoxProps & {
  snapName: string;
  isInstalled: boolean;
  icon?: string | undefined;
  size?: ResponsiveValue<string>;
  badgeSize?: string;
  background?: string;
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
 * @param props.background - The background color of the icon.
 * @returns The Snap icon component.
 */
export const SnapAvatar: FunctionComponent<SnapIconProps> = ({
  snapName,
  icon,
  isInstalled,
  size = '3rem',
  badgeSize = '1.5rem',
  background = 'background.alternative',
  ...props
}) => {
  return (
    <Box position="relative" {...props}>
      <Avatar
        src={icon as string}
        name={snapName.slice(0, 1).toUpperCase()}
        fontSize="md"
        background={background}
        color="text.alternative"
        size="md"
        width={size}
        height={size}
        margin="1"
      />
      {isInstalled && (
        <SnapIcon
          width={badgeSize}
          height={badgeSize}
          position="absolute"
          bottom="0"
          right="0"
          fill="info.default"
          data-testid="snap-icon"
        />
      )}
    </Box>
  );
};
