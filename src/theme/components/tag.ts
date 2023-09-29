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
        paddingX: '3',
        paddingY: '2',
        background: 'tag.category',
      },
    }),

    muted: definePartsStyle({
      container: {
        backgroundColor: 'tag.muted',
        color: 'gray.muted',
      },
    }),
  },
});
