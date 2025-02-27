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
        default: '#0A0A0A',
        _dark: '#FFFFFF',
      },
      light: {
        default: '#FFFFFF',
      },
      alternative: {
        default: '#393D46',
        _dark: '#C8CEDA',
      },
      muted: {
        default: '#24272A1A',
      },
    },
    background: {
      default: {
        default: '#FFFFFF',
        _dark: '#24272A',
      },
      'default-hover': {
        default: '#FAFAFA',
        _dark: '#282B2E',
      },
      'default-hover-muted': {
        default: '#FAFAFA00',
        _dark: '#282B2E00',
      },
      header: {
        // These colours should be the same as `background.default`, but with
        // different opacity values.
        default: '#FFFFFFC0',
        _dark: '#24272A80',
      },
      alternative: { default: '#F2F4F6', _dark: '#141618' },
      'alternative-hover': { default: '#EDEFF1', _dark: '#191B1D' },
    },
    primary: {
      default: {
        default: '#4459FF',
        _dark: '#6F7EFF',
      },
      alternative: {
        default: '#0A0A0A',
        _dark: '#FFFFFF',
      },
      inverse: {
        default: '#FCFCFC',
      },
    },
    info: {
      default: {
        default: '#4459FF',
        _dark: '#6F7EFF',
      },
      muted: {
        default: '#037DD61A',
        _dark: '#1098FC26',
      },
    },
    success: {
      default: {
        default: '#28A745',
        _dark: '#28A745',
      },
      muted: {
        default: '#28A7451A',
        _dark: '#28A74515',
      },
    },
    error: {
      default: {
        default: '#D73847',
        _dark: '#D73847',
      },
      muted: {
        default: '#D738471A',
        _dark: '#D738471A',
      },
    },
    warning: {
      default: {
        default: '#BF5208',
        _dark: '#FFD33D',
      },
      muted: {
        default: '#BF520819',
        _dark: '#FFD33D26',
      },
    },
    default: {
      default: {
        default: '#F2F4F6',
        _dark: '#F2F4F6',
      },
    },
    border: {
      muted: {
        default: '#D6D9DC',
        _dark: '#3B4046',
      },
    },
    icon: {
      default: {
        default: '#24272A',
        _dark: 'white',
      },
      alternative: {
        default: '#F2F4F6',
        _dark: '#141618',
      },
      'alternative-muted': {
        default: '#6A737D33',
        _dark: '#14161833',
      },
      muted: {
        default: '#BBC0C5',
        _dark: '#9FA6AE',
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
    md: {
      default: '0px 4px 16px 0px #00000066',
      _dark: '0px 2px 16px 0px #00000040',
    },
    lg: '0px 2px 40px 0px #0000001A',
    xl: '0px 4px 16px 0px #0000001A',
  },
};
