import type { As, BoxProps, ComponentWithAs } from '@chakra-ui/react';
import { Box, forwardRef } from '@chakra-ui/react';
import type { MessageDescriptor } from '@lingui/core';
import { useLingui } from '@lingui/react';
import type { FunctionComponent } from 'react';

export type IconProps = BoxProps & {
  as: As;
  label?: MessageDescriptor;
  fill?: string;
};

/**
 * A component that wraps a SVGR component into a `Box` component.
 *
 * @param props - The props of the `Box` and SVG component.
 * @param props.as - The SVGR component.
 * @param props.label - The label of the SVG component.
 * @param props.fill - The fill color of the SVG component.
 * @returns A React component.
 */
export const Icon: ComponentWithAs<As, IconProps> = forwardRef(
  ({ as, label, fill, ...props }, ref) => {
    const i18n = useLingui();

    return (
      <Box
        ref={ref}
        {...props}
        as="span"
        display="block"
        sx={{
          ...props.sx,
          '& > svg': {
            fill,
          },
        }}
      >
        <Box
          as={as}
          aria-label={label && i18n._(label)}
          width="100%"
          height="100%"
        />
      </Box>
    );
  },
);

export const wrapIcon = (
  IconComponent: FunctionComponent,
  label: MessageDescriptor,
) =>
  forwardRef((props: Omit<IconProps, 'as'>, ref) => (
    <Icon ref={ref} as={IconComponent} label={label} {...props} />
  ));
