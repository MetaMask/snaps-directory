import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

export const Input = defineMultiStyleConfig({
  variants: {
    simple: definePartsStyle({
      field: {
        color: 'text.default',
        background: 'none',
        padding: '0',
        margin: '0',
        outline: 'none',
        border: 'none',
        height: 'auto',
      },
    }),
  },
});
