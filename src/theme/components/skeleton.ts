import { cssVar, defineStyle, defineStyleConfig } from '@chakra-ui/react';

export const Skeleton = defineStyleConfig({
  baseStyle: defineStyle({
    [cssVar('skeleton-start-color').variable]: 'colors.background.alternative',
    [cssVar('skeleton-end-color').variable]: 'colors.border',
    borderRadius: 'lg',
  }),
});
