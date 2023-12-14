import { modalAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(modalAnatomy.keys);

export const Modal = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    dialog: {
      backgroundColor: 'background.default',
    },
  }),

  variants: {
    minimal: definePartsStyle({
      dialog: {
        backgroundColor: 'background.default',
        padding: '6',
        borderRadius: '3xl',
      },

      body: {
        padding: '0',
      },
    }),
  },
});
