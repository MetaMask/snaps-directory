import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

export const Input = defineMultiStyleConfig({
  baseStyle: {
    field: {
      color: 'text.default',
      fontSize: 'sm',
      borderRadius: 'full',
      paddingX: '6',
      paddingY: '4',
      _placeholder: {
        color: 'text.default',
        textTransform: 'uppercase',
        fontWeight: '500',
      },
    },
  },

  variants: {
    outline: definePartsStyle({
      field: {
        borderWidth: '0.094rem',
        borderColor: 'text.default',
      },
    }),
  },
});
