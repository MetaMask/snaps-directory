import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

export const Tooltip = defineStyleConfig({
  baseStyle: defineStyle({
    background: 'background.default',
    border: '1px solid',
    borderColor: 'border.muted',
    borderRadius: 'md',
    paddingX: 4,
    paddingY: 2,
    color: 'text.default',
    fontWeight: 'normal',
  }),
});
