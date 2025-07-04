import { describe, it, expect } from '@jest/globals';

import { themeConfig } from '.';

describe('theme', () => {
  it('matches the snapshot', () => {
    expect(themeConfig).toMatchInlineSnapshot(`
      Object {
        "colors": Object {
          "error": Object {
            "default": "#D34C46",
            "muted": "rgba(215, 56, 71, 0.1)",
          },
          "success": Object {
            "default": "#579F6E",
            "muted": "rgba(40, 167, 69, 0.1)",
          },
        },
        "components": Object {
          "Button": Object {
            "baseStyle": Object {
              "_hover": Object {
                "opacity": "0.75",
              },
              "borderRadius": "full",
              "color": "text.default",
              "lineHeight": "1",
            },
            "variants": Object {
              "filter": Object {
                "_hover": Object {
                  "background": "background.alternative-hover",
                  "opacity": 1,
                },
                "background": "background.alternative",
              },
              "outline": Object {
                "_active": Object {
                  "background": "text.alternative",
                  "color": "background.default",
                },
                "_hover": Object {
                  "background": "text.default",
                  "color": "background.default",
                  "opacity": "1",
                },
                "border": "1.5px solid",
                "borderColor": "text.default",
                "fontSize": "sm",
                "fontWeight": "500",
                "paddingX": "6",
                "paddingY": "4",
              },
              "primary": Object {
                "background": "primary.default",
                "color": "text.light",
                "fontSize": "md",
                "fontWeight": "500",
                "minHeight": "3rem",
                "paddingX": "6",
                "paddingY": "4",
              },
              "small": Object {
                ".chakra-button__icon": Object {
                  "marginLeft": "1",
                  "svg": Object {
                    "transitionDuration": "normal",
                  },
                },
                "_hover": Object {
                  ".chakra-button__icon": Object {
                    "svg": Object {
                      "fill": "white",
                    },
                  },
                },
                "background": "background.alternative",
                "borderColor": "info.default",
                "borderRadius": "36px",
                "color": "text.alternative",
                "fontSize": "sm",
                "fontWeight": "500",
                "height": "26px",
                "transitionDuration": "normal",
              },
            },
          },
          "Container": Object {
            "baseStyle": Object {
              "paddingX": 4,
              "paddingY": 4,
            },
            "sizes": Object {
              "fullWidth": Object {
                "maxWidth": "100%",
              },
            },
          },
          "Divider": Object {
            "baseStyle": Object {
              "opacity": 1,
            },
          },
          "Heading": Object {
            "baseStyle": Object {
              "color": "text.default",
              "fontWeight": "500",
              "lineHeight": "1.5",
            },
          },
          "Input": Object {
            "baseStyle": Object {
              "field": Object {
                "_placeholder": Object {
                  "color": "text.default",
                  "fontWeight": "500",
                  "textTransform": "uppercase",
                },
                "borderRadius": "full",
                "color": "text.default",
                "fontSize": "sm",
                "paddingX": "6",
                "paddingY": "4",
              },
            },
            "parts": Array [
              "addon",
              "field",
              "element",
              "group",
            ],
            "variants": Object {
              "outline": Object {
                "field": Object {
                  "_hover": Object {
                    "background": "background.alternative",
                    "borderColor": "text.default",
                  },
                  "borderColor": "text.default",
                  "borderWidth": "0.094rem",
                },
              },
            },
          },
          "Link": Object {
            "baseStyle": Object {
              "color": "info.default",
            },
            "variants": Object {
              "box": Object {
                "backgroundColor": "background.alternative",
                "border": "1px solid",
                "borderColor": "border.muted",
                "borderRadius": "lg",
                "display": "block",
                "paddingX": "4",
                "paddingY": "3",
                "width": "100%",
              },
              "landing": Object {
                "color": "info.default",
                "fontWeight": "500",
              },
              "navigation-active": Object {
                "background": "background.alternative",
                "borderRadius": "lg",
                "opacity": "1",
              },
              "navigation-default": Object {
                "borderRadius": "lg",
                "opacity": "0.6",
              },
            },
          },
          "Menu": Object {
            "baseStyle": Object {
              "groupTitle": Object {
                "color": "text.alternative",
                "fontSize": "sm",
                "fontWeight": "500",
                "marginBottom": "1",
                "textTransform": "uppercase",
              },
              "item": Object {
                "_hover": Object {
                  "background": "background.default-hover",
                },
                "background": "none",
                "padding": "2",
              },
              "list": Object {
                "background": "background.default",
                "border": "none",
                "borderRadius": "lg",
                "boxShadow": "md",
                "padding": "1",
              },
            },
            "parts": Array [
              "button",
              "list",
              "item",
              "groupTitle",
              "icon",
              "command",
              "divider",
            ],
          },
          "Modal": Object {
            "baseStyle": Object {
              "dialog": Object {
                "backgroundColor": "background.default",
              },
            },
            "parts": Array [
              "overlay",
              "dialogContainer",
              "dialog",
              "header",
              "closeButton",
              "body",
              "footer",
            ],
            "variants": Object {
              "minimal": Object {
                "body": Object {
                  "padding": "0",
                },
                "dialog": Object {
                  "backgroundColor": "background.default",
                  "borderRadius": "3xl",
                  "padding": "6",
                },
              },
              "screenshot": Object {
                "dialog": Object {
                  "borderRadius": "2xl",
                  "boxShadow": "md",
                },
              },
            },
          },
          "Skeleton": Object {
            "baseStyle": Object {
              "--skeleton-end-color": "colors.border.muted",
              "--skeleton-start-color": "colors.background.alternative",
              "borderRadius": "lg",
            },
          },
          "Tag": Object {
            "baseStyle": Object {
              "container": Object {
                "background": "info.muted",
                "borderRadius": "full",
                "color": "info.default",
                "fontSize": "sm",
                "fontWeight": "500",
                "paddingX": "2",
                "textTransform": "uppercase",
              },
            },
            "parts": Array [
              "container",
              "label",
              "closeButton",
            ],
            "variants": Object {
              "category": Object {
                "container": Object {
                  "background": "info.muted",
                  "lineHeight": "1.5",
                  "padding": "3",
                  "textTransform": "none",
                },
              },
              "code": Object {
                "container": Object {
                  "background": "info.muted",
                  "borderRadius": "0px",
                  "color": "info.default",
                  "fontFamily": "code",
                  "fontWeight": "normal",
                },
              },
              "default": Object {
                "container": Object {
                  "background": "background.alternative",
                  "borderRadius": "1.25rem",
                  "color": "text.alternative",
                  "gap": "2",
                  "paddingX": "4",
                  "paddingY": "2",
                  "textTransform": "none",
                },
              },
              "error": Object {
                "container": Object {
                  "background": "error.muted",
                  "borderRadius": "1.25rem",
                  "color": "error.default",
                  "gap": "2",
                  "paddingX": "4",
                  "paddingY": "2",
                  "textTransform": "none",
                },
              },
              "muted": Object {
                "container": Object {
                  "backgroundColor": "background.alternative",
                  "color": "text.alternative",
                },
              },
              "success": Object {
                "container": Object {
                  "background": "success.muted",
                  "borderRadius": "1.25rem",
                  "color": "success.default",
                  "gap": "2",
                  "paddingX": "4",
                  "paddingY": "2",
                  "textTransform": "none",
                },
              },
            },
          },
          "Text": Object {
            "baseStyle": Object {
              "color": "text.default",
              "lineHeight": "base",
            },
            "variants": Object {
              "muted": Object {
                "color": "text.muted",
              },
            },
          },
          "Tooltip": Object {
            "baseStyle": Object {
              "background": "background.default",
              "border": "1px solid",
              "borderColor": "border.muted",
              "borderRadius": "md",
              "color": "text.default",
              "fontWeight": "normal",
              "paddingX": 4,
              "paddingY": 2,
            },
          },
        },
        "config": Object {
          "initialColorMode": "system",
          "useSystemColorMode": true,
        },
        "fonts": Object {
          "body": "\\"Geist\\", -apple-system, BlinkMacSystemFont, \\"Segoe UI\\", Roboto, Helvetica, Arial, sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\"",
          "code": "SFMono-Regular, Consolas, \\"Liberation Mono\\", Menlo, Courier, monospace",
          "heading": "\\"MM Sans\\", -apple-system, BlinkMacSystemFont, \\"Segoe UI\\", Roboto, Helvetica, Arial, sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\"",
        },
        "semanticTokens": Object {
          "borders": Object {
            "muted": Object {
              "_dark": "1px solid #3B4046",
              "default": "1px solid #D6D9DC",
            },
          },
          "colors": Object {
            "background": Object {
              "alternative": Object {
                "_dark": "#141618",
                "default": "#F2F4F6",
              },
              "alternative-hover": Object {
                "_dark": "#191B1D",
                "default": "#EDEFF1",
              },
              "default": Object {
                "_dark": "#24272A",
                "default": "#FFFFFF",
              },
              "default-hover": Object {
                "_dark": "#282B2E",
                "default": "#FAFAFA",
              },
              "default-hover-muted": Object {
                "_dark": "#282B2E00",
                "default": "#FAFAFA00",
              },
              "header": Object {
                "_dark": "#24272A80",
                "default": "#FFFFFFC0",
              },
            },
            "border": Object {
              "muted": Object {
                "_dark": "#3B4046",
                "default": "#D6D9DC",
              },
            },
            "default": Object {
              "default": Object {
                "_dark": "#F2F4F6",
                "default": "#F2F4F6",
              },
            },
            "error": Object {
              "default": Object {
                "_dark": "#D73847",
                "default": "#D73847",
              },
              "muted": Object {
                "_dark": "#D738471A",
                "default": "#D738471A",
              },
            },
            "icon": Object {
              "alternative": Object {
                "_dark": "#141618",
                "default": "#F2F4F6",
              },
              "alternative-muted": Object {
                "_dark": "#14161833",
                "default": "#6A737D33",
              },
              "default": Object {
                "_dark": "white",
                "default": "#24272A",
              },
              "muted": Object {
                "_dark": "#9FA6AE",
                "default": "#BBC0C5",
              },
            },
            "info": Object {
              "default": Object {
                "_dark": "#6F7EFF",
                "default": "#4459FF",
              },
              "muted": Object {
                "_dark": "#1098FC26",
                "default": "#037DD61A",
              },
            },
            "primary": Object {
              "alternative": Object {
                "_dark": "#FFFFFF",
                "default": "#0A0A0A",
              },
              "default": Object {
                "_dark": "#6F7EFF",
                "default": "#4459FF",
              },
              "inverse": Object {
                "default": "#FCFCFC",
              },
            },
            "success": Object {
              "default": Object {
                "_dark": "#28A745",
                "default": "#28A745",
              },
              "muted": Object {
                "_dark": "#28A74515",
                "default": "#28A7451A",
              },
            },
            "text": Object {
              "alternative": Object {
                "_dark": "#C8CEDA",
                "default": "#393D46",
              },
              "default": Object {
                "_dark": "#FFFFFF",
                "default": "#0A0A0A",
              },
              "light": Object {
                "default": "#FFFFFF",
              },
              "muted": Object {
                "default": "#24272A1A",
              },
            },
            "warning": Object {
              "default": Object {
                "_dark": "#FFD33D",
                "default": "#BF5208",
              },
              "muted": Object {
                "_dark": "#FFD33D26",
                "default": "#BF520819",
              },
            },
          },
          "shadows": Object {
            "lg": "0px 2px 40px 0px #0000001A",
            "md": Object {
              "_dark": "0px 2px 16px 0px #00000040",
              "default": "0px 4px 16px 0px #00000066",
            },
            "xl": "0px 4px 16px 0px #0000001A",
          },
        },
        "styles": Object {
          "global": Object {
            "body": Object {
              "background": "background.default",
              "color": "text.default",
              "overflowY": "scroll",
            },
          },
        },
      }
    `);
  });
});
