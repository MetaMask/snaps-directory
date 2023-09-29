import { defineStyleConfig } from '@chakra-ui/react';

export const Text = defineStyleConfig({
  baseStyle: {
    color: {
      default: 'black',
      _dark: 'white',
    },
  },

  variants: {
    muted: {
      color: 'text.muted',
    },
  },
});
