import type { Pseudos } from '@chakra-ui/react';
import type { SemanticValue } from '@chakra-ui/styled-system';

// We cannot use `Record` here, because it does not support recursive types.
export type SemanticTokens = {
  [key: string]: Record<string, SemanticValue<keyof Pseudos> | SemanticTokens>;
};

/**
 * Semantic tokens for the Chakra UI theme.
 *
 * @see https://chakra-ui.com/docs/styled-system/semantic-tokens
 */
export const semanticTokens: SemanticTokens = {
  colors: {
    text: {
      default: {
        default: '#24272A',
        _dark: '#9FA6AE',
      },
      alternative: {
        default: '#535A61',
        _dark: '#D6D9DC',
      },
      tab: {
        default: '#535A61',
        _dark: '#FFFFFF',
        selected: {
          default: '#24272A',
          _dark: '#FFFFFF',
        },
      },
      console: {
        default: '#535A61',
        _dark: '#D6D9DC',
      },
      muted: {
        default: '#BBC0C5',
        _dark: '#D6D9DC',
      },
    },
    background: {
      body: {
        default: '#F8F8F8',
        _dark: '#141618',
      },
      default: {
        default: '#FFFFFF',
        _dark: '#24272A',
      },
      'default-hover': {
        default: '#FAFAFA',
        _dark: '#282B2E',
      },
      header: {
        // These colours should be the same as `background.default`, but with
        // different opacity values.
        default: '#FFFFFFC0',
        _dark: '#24272A80',
      },
      alternative: { default: '#F2F4F6', _dark: '#141618' },
      'alternative-hover': { default: '#EDEFF1', _dark: '#191B1D' },
      hover: {
        default: '#EEEEEE',
        _dark: '#33373E',
      },
      avatar: {
        default: '#f2f4f6',
        _dark: '#141618',
      },
    },
    info: {
      default: {
        default: '#0376C9',
        _dark: '#1098FC',
      },
      muted: {
        default: '#0376C91A',
        _dark: '#1098FC26',
      },
    },
    border: {
      muted: {
        default: '#D6D9DC',
        _dark: '#3B4046',
      },
    },
    icon: {
      alternative: {
        default: '#F2F4F6',
        _dark: '#141618',
      },
      muted: {
        default: '#6A737D',
      },
    },
  },

  borders: {
    muted: {
      default: '1px solid #D6D9DC',
      _dark: '1px solid #3B4046',
    },
  },

  shadows: {
    md: '0px 2px 16px 0px #0000001A',
    lg: '0px 2px 40px 0px #0000001A',
    xl: '0px 4px 16px 0px #0000001A',
  },
};
