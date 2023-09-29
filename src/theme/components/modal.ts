import { modalAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(modalAnatomy.keys);

export const Modal = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    dialog: {
      bg: 'chakra-body-bg',
    },
  }),

  variants: {
    minimal: definePartsStyle({
      dialog: {
        padding: '6',
        background: 'chakra-body-bg',
        borderRadius: '3xl',
      },

      body: {
        padding: '0',
      },
    }),
  },
});
