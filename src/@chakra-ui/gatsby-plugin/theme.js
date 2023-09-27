// Snaps Simulator theme, may need some tweaking

/* eslint-disable @typescript-eslint/naming-convention */

import {
  tagAnatomy,
  tabsAnatomy,
  modalAnatomy,
  switchAnatomy,
  menuAnatomy,
} from '@chakra-ui/anatomy';
import {
  createMultiStyleConfigHelpers,
  cssVar,
  defineStyle,
  defineStyleConfig,
  extendTheme,
} from '@chakra-ui/react';

/* eslint-disable @typescript-eslint/unbound-method */
const {
  definePartsStyle: defineTagPartsStyle,
  defineMultiStyleConfig: defineTagMultiStyleConfig,
} = createMultiStyleConfigHelpers(tagAnatomy.keys);

const {
  definePartsStyle: defineTabsPartsStyle,
  defineMultiStyleConfig: defineTabsMultiStyleConfig,
} = createMultiStyleConfigHelpers(tabsAnatomy.keys);

const {
  definePartsStyle: defineModalPartsStyle,
  defineMultiStyleConfig: defineModalMultiStyleConfig,
} = createMultiStyleConfigHelpers(modalAnatomy.keys);

const {
  definePartsStyle: defineSwitchPartsStyle,
  defineMultiStyleConfig: defineSwitchMultiStyleConfig,
} = createMultiStyleConfigHelpers(switchAnatomy.keys);

const {
  definePartsStyle: defineMenuPartsStyle,
  defineMultiStyleConfig: defineMenuMultiStyleConfig,
} = createMultiStyleConfigHelpers(menuAnatomy.keys);
/* eslint-enable @typescript-eslint/unbound-method */

const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,

  styles: {
    global: {
      body: {
        overflowY: 'scroll',
      },
    },
  },

  semanticTokens: {
    colors: {
      'chakra-body-bg': { _light: '#F8FAFC', _dark: '#141618' },
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
  },

  colors: {
    text: {
      white: '#FFFFFF',
      alternative: '#535A61',
      success: '#579F6E',
      error: '#D34C46',
    },
    error: {
      default: '#D34C46',
      muted: 'rgba(215, 56, 71, 0.1)',
    },
    success: {
      default: '#579F6E',
      muted: 'rgba(40, 167, 69, 0.1)',
    },
    gray: {
      40: '#F2F4F6',
    },
  },

  components: {
    Container: defineStyleConfig({
      baseStyle: {
        paddingX: 4,
        paddingY: 4,
      },
      sizes: {
        fullWidth: {
          maxWidth: '100%',
        },
      },
    }),

    Divider: defineStyleConfig({
      baseStyle: {
        opacity: 1,
      },
    }),

    Link: defineStyleConfig({
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
          borderColor: 'border.default',
        },
      },
    }),

    Tabs: defineTabsMultiStyleConfig({
      variants: {
        line: defineTabsPartsStyle({
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
    }),

    Text: defineStyleConfig({
      baseStyle: {
        color: {
          default: 'black',
          _dark: 'white',
        },
      },

      variants: {
        muted: {
          color: 'text.muted',
        },
      },
    }),

    Tag: defineTagMultiStyleConfig({
      baseStyle: {
        container: {
          borderRadius: 'full',
          fontSize: 'sm',
          fontWeight: '500',
          textTransform: 'uppercase',
          paddingX: '2',
          color: 'info.default',
          background: 'info.muted',
        },
      },

      variants: {
        code: defineTagPartsStyle({
          container: {
            color: 'info.default',
            background: 'info.muted',
            borderRadius: '0px',
            fontWeight: 'normal',
            fontFamily: 'code',
          },
        }),

        category: defineTagPartsStyle({
          container: {
            lineHeight: '1.5',
            textTransform: 'none',
            paddingX: '3',
            paddingY: '2',
            background: 'tag.category',
          },
        }),

        muted: defineTagPartsStyle({
          container: {
            backgroundColor: 'tag.muted',
            color: 'gray.muted',
          },
        }),
      },
    }),

    Button: defineStyleConfig({
      variants: {
        solid: defineStyle({
          bg: '#24272A',
          textColor: 'white',
          _hover: {
            bg: '#0376C9',
          },
          _active: {
            bg: '#0376C9',
          },
        }),
        primary: defineStyle({
          height: '48px',
          borderRadius: '30px',
          background: 'info.default',
          fontSize: 'md',
          fontWeight: '500',
          lineHeight: '157%',
          color: 'white',
          borderColor: 'info.default',
          padding: '4',
          _hover: {
            _disabled: {
              background: 'info.default',
            },
          },
        }),
        outline: defineStyle({
          height: '48px',
          borderRadius: '30px',
          background: 'transparent',
          fontSize: 'md',
          fontWeight: '500',
          lineHeight: '157%',
          color: 'info.default',
          border: '1.5px solid',
          borderColor: 'info.default',
          padding: '4',
        }),
        shadow: defineStyle({
          background: 'background.header',
          boxShadow: 'md',
          _hover: {
            opacity: '0.75',
          },
        }),
      },
    }),

    Skeleton: defineStyleConfig({
      baseStyle: defineStyle({
        [cssVar('skeleton-start-color').variable]:
          'colors.background.alternative',
        [cssVar('skeleton-end-color').variable]: 'colors.border',
        borderRadius: 'lg',
      }),
    }),

    Modal: defineModalMultiStyleConfig({
      baseStyle: defineModalPartsStyle({
        dialog: {
          bg: 'chakra-body-bg',
        },
      }),

      variants: {
        minimal: defineModalPartsStyle({
          dialog: {
            padding: '6',
            background: 'chakra-body-bg',
            borderRadius: '3xl',
          },

          body: {
            padding: '0',
          },
        }),
      },
    }),

    Switch: defineSwitchMultiStyleConfig({
      baseStyle: defineSwitchPartsStyle({
        track: {
          _checked: {
            bg: '#0376C9',
          },
        },
      }),
    }),

    Menu: defineMenuMultiStyleConfig({
      baseStyle: defineMenuPartsStyle({
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
    }),
  },

  fonts: {
    heading: `"Euclid Circular B", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    body: `"Euclid Circular B", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    code: `SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace`,
  },
});

export default theme;
