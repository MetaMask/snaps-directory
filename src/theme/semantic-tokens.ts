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
    'chakra-body-bg': {
      default: '#F8FAFC',
      _dark: '#141618',
    },
    text: {
      default: '#24272A',
      _dark: '#9FA6AE',
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
      alternative: { default: '#F5F5F5', _dark: '#1D1F22' },
      hover: {
        default: '#FAFBFC',
        _dark: '#2F3338',
      },
      header: {
        default: '#FFFFFF',
        _dark: '#1D1F23',
      },
      menu: {
        default: '#FFFFFF',
        _dark: '#282B2E',
      },
    },
    info: {
      default: {
        default: '#0376C9',
        _dark: '#1098FC',
      },
      muted: {
        default: 'rgba(3, 118, 201, 0.1)',
        _dark: '#141618',
      },
    },
    border: {
      default: {
        default: '#D6D9DC',
        _dark: '#3B4046',
      },
      active: {
        default: '#24272A',
        _dark: 'rgba(255, 255, 255, 0.06)',
      },
    },
    gray: {
      light: {
        default: '#F1F1F1',
        _dark: '#1A1C1F',
      },
      muted: {
        default: '#878787',
        _dark: '#D6D9DC',
      },
    },
    tag: {
      category: {
        default: 'info.muted',
        _dark: 'rgba(16, 152, 252, 0.15)',
      },
      muted: {
        default: '#F5F5F5',
        _dark: '#141618',
      },
    },
  },

  borders: {
    muted: {
      default: '1px solid #D6D9DC',
      _dark: '1px solid #3B4046',
    },
  },
};
