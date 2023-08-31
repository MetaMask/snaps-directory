import type { PropsOf } from "@chakra-ui/react";
import { Image, useColorMode } from "@chakra-ui/react";
import { hasProperty } from "@metamask/utils";
import type { ForwardRefExoticComponent } from "react";
import { forwardRef } from "react";
import React from "react";

import snapIcon from "../assets/icons/snap.svg";

const DEFAULT_ICONS = {
  snap: {
    alt: "Snap",
    src: snapIcon,
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
      width = "32px",
      height = width,
      ...props
    },
    ref
  ) => {
    const { colorMode } = useColorMode();

    const iconMetadata = DEFAULT_ICONS[icon];
    const defaultSrc = iconMetadata.src;
    const darkSrc = hasProperty(iconMetadata, "srcDark")
      ? iconMetadata.srcDark
      : iconMetadata.src;

    const src = colorMode === "light" ? defaultSrc : darkSrc;

    return (
      <Image
        ref={ref}
        src={src}
        alt={alt}
        width={width}
        height={height}
        {...props}
      />
    );
  }
);
