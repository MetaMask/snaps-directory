import type { BoxProps } from '@chakra-ui/react';
import { Avatar, Box } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { Icon } from './Icon';

export type SnapIconProps = BoxProps & {
  snapName: string;
  isInstalled: boolean;
  icon?: string | undefined;
};

/**
 * A Snap icon, which renders the icon defined in the snap's manifest, or a
 * fallback icon if the snap doesn't define one.
 *
 * @param props - The props.
 * @param props.snapName - The name of the snap.
 * @param props.icon - The SVG icon defined in the snap's manifest.
 * @param props.isInstalled - Whether the snap is installed or not.
 * @returns The Snap icon component.
 */
export const SnapIcon: FunctionComponent<SnapIconProps> = ({
  snapName,
  icon,
  isInstalled,
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
        margin="1"
      />
      <Icon
        icon={isInstalled ? 'snap' : 'snapMuted'}
        width="24px"
        height="24px"
        position="absolute"
        bottom="0px"
        right="0px"
      />
    </Box>
  );
};
