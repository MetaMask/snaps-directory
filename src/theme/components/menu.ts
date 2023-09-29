import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys);

export const Menu = defineMultiStyleConfig({
  baseStyle: definePartsStyle({
    list: {
      border: 'none',
      borderRadius: 'lg',
      padding: '1',
      boxShadow: 'lg',
      background: 'background.menu',
    },
    item: {
      padding: '2',
      background: 'none',
      _hover: {
        background: 'background.alternative',
      },
    },
    groupTitle: {
      textTransform: 'uppercase',
      color: 'text.muted',
      fontSize: 'sm',
      fontWeight: '500',
      marginBottom: '1',
    },
  }),
});
