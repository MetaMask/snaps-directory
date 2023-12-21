import { tableAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tableAnatomy.keys);

export const Table = defineMultiStyleConfig({
  variants: {
    simple: definePartsStyle({
      th: {
        fontWeight: '500',
        fontSize: 'sm',
        color: 'text.muted',
        paddingLeft: 0,
      },
      td: {
        paddingLeft: 0,
        borderBottom: 0,
      },
    }),
  },
});
