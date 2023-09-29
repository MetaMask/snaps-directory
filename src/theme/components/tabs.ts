import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tabsAnatomy.keys);

export const Tabs = defineMultiStyleConfig({
  variants: {
    line: definePartsStyle({
      tablist: {
        background: 'background.alternative',
        borderBottom: '1px solid',
        borderColor: 'border.default',
        paddingX: '4',
      },
      tab: {
        color: 'text.tab',
        fontSize: 'xs',
        fontWeight: '600',
        textTransform: 'uppercase',
        outline: 'none',
        paddingTop: '0',
        paddingX: '0',
        paddingBottom: '0.5',
        marginY: '3',
        background: 'none',
        '& + &': {
          marginLeft: '4',
        },
        _selected: {
          color: 'text.tab.selected',
          borderBottom: '2px solid',
          borderColor: 'border.active',
        },
      },
    }),
  },
});
