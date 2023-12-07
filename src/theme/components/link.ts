import { defineStyleConfig } from '@chakra-ui/react';

export const Link = defineStyleConfig({
  baseStyle: {
    color: 'info.default',
  },

  variants: {
    'navigation-active': {
      opacity: '1',
      background: 'background.alternative',
      borderRadius: 'lg',
    },

    'navigation-default': {
      opacity: '0.6',
      borderRadius: 'lg',
    },

    box: {
      display: 'block',
      width: '100%',
      paddingX: '4',
      paddingY: '3',
      borderRadius: 'lg',
      backgroundColor: 'background.alternative',
      border: '1px solid',
      borderColor: 'border.muted',
    },

    landing: {
      color: 'info.default',
      fontWeight: '500',
    },
  },
});
