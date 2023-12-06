import { tagAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tagAnatomy.keys);

export const Tag = defineMultiStyleConfig({
  baseStyle: {
    container: {
      borderRadius: 'full',
      fontSize: 'sm',
      fontWeight: '500',
      textTransform: 'uppercase',
      paddingX: '2',
      color: 'info.default',
      background: 'info.muted',
    },
  },

  variants: {
    code: definePartsStyle({
      container: {
        color: 'info.default',
        background: 'info.muted',
        borderRadius: '0px',
        fontWeight: 'normal',
        fontFamily: 'code',
      },
    }),

    category: definePartsStyle({
      container: {
        lineHeight: '1.5',
        textTransform: 'none',
        padding: '3',
        background: 'info.muted',
      },
    }),

    muted: definePartsStyle({
      container: {
        backgroundColor: 'background.alternative',
        color: 'text.alternative',
      },
    }),
  },
});
