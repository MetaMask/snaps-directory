import { defineStyleConfig } from '@chakra-ui/react';

export const Text = defineStyleConfig({
  baseStyle: {
    color: 'text.default',
    lineHeight: 'base',
  },

  variants: {
    muted: {
      color: 'text.muted',
    },
  },
});
