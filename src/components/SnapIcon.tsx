import type { BoxProps } from '@chakra-ui/react';
import { Avatar, Box } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { Icon } from './Icon';

export type SnapIconProps = BoxProps & {
  snapName: string;
  svgIcon?: string | undefined;
};

/**
 * A Snap icon, which renders the icon defined in the snap's manifest, or a
 * fallback icon if the snap doesn't define one.
 *
 * @param props - The props.
 * @param props.snapName - The name of the snap.
 * @param props.svgIcon - The SVG icon defined in the snap's manifest.
 * @returns The Snap icon component.
 */
export const SnapIcon: FunctionComponent<SnapIconProps> = ({
  snapName,
  svgIcon,
  ...props
}) => {
  return (
    <Box position="relative" {...props}>
      <Avatar
        src={svgIcon as string}
        name={snapName.slice(1, 2).toUpperCase()}
        fontSize="md"
        background="background.alternative"
        color="text.alternative"
        size="md"
        margin="1"
      />
      <Icon
        icon="snap"
        width="24px"
        height="24px"
        position="absolute"
        bottom="0px"
        right="0px"
      />
    </Box>
  );
};
