import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

export const Button = defineStyleConfig({
  baseStyle: defineStyle({
    borderRadius: 'full',
    color: 'text.default',
    lineHeight: '1',
    textTransform: 'uppercase',
    _hover: {
      opacity: '0.75',
    },
  }),

  variants: {
    primary: defineStyle({
      background: 'primary.default',
      fontSize: 'sm',
      fontWeight: '500',
      paddingX: '6',
      paddingY: '4',
      color: 'text.dark',
    }),

    outline: defineStyle({
      border: '1.5px solid',
      borderColor: 'text.default',
      fontSize: 'sm',
      fontWeight: '500',
      paddingX: '6',
      paddingY: '4',
    }),

    filter: defineStyle({
      background: 'background.alternative',
      _hover: {
        background: 'background.alternative-hover',
        opacity: 1,
      },
    }),

    small: defineStyle({
      fontSize: 'sm',
      fontWeight: '500',
      height: '26px',
      borderRadius: '36px',
      background: 'background.alternative',
      borderColor: 'info.default',
      color: 'text.alternative',
      transitionDuration: 'normal',
      _hover: {
        '.chakra-button__icon': {
          svg: {
            fill: 'white',
          },
        },
      },
      '.chakra-button__icon': {
        marginLeft: '1',
        svg: {
          transitionDuration: 'normal',
        },
      },
    }),
  },
});
