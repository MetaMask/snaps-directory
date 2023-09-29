import type { ThemeConfig } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

import { colors } from './colors';
import { components } from './components';
import { fonts } from './fonts';
import { global } from './global';
import { semanticTokens } from './semantic-tokens';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

export const theme = extendTheme({
  colors,
  components,
  config,
  fonts,
  semanticTokens,
  styles: {
    global,
  },
});
