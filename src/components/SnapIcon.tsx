import { Avatar, Box } from "@chakra-ui/react";
import type { FunctionComponent } from "react";
import React from "react"

import { Icon } from "./Icon";

export type SnapIconProps = {
  snapName: string;
  svgIcon: string | undefined;
};

/**
 * A Snap icon, which renders the icon defined in the snap's manifest, or a
 * fallback icon if the snap doesn't define one.
 *
 * @param props - The props.
 * @param props.snapName - The name of the snap.
 * @returns The Snap icon component.
 */
export const SnapIcon: FunctionComponent<SnapIconProps> = ({
  snapName,
  svgIcon,
}) => {
  return (
    <Box position="relative">
      <Avatar
        src={svgIcon}
        name={snapName.slice(1, 2).toUpperCase()}
        fontSize="md"
        background="background.alternative"
        color="text.alternative"
        size="sm"
        margin="1"
      />
      <Icon
        icon="snap"
        width="16px"
        height="16px"
        position="absolute"
        bottom="0px"
        right="0px"
      />
    </Box>
  );
};
