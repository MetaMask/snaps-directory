import { defineStyleConfig } from '@chakra-ui/react';

export const Container = defineStyleConfig({
  baseStyle: {
    paddingX: 4,
    paddingY: 4,
  },
  sizes: {
    fullWidth: {
      maxWidth: '100%',
    },
  },
});
