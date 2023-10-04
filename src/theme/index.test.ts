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
          "gray": Object {
            "40": "#F2F4F6",
          },
          "success": Object {
            "default": "#579F6E",
            "muted": "rgba(40, 167, 69, 0.1)",
          },
          "text": Object {
            "alternative": "#535A61",
            "error": "#D34C46",
            "success": "#579F6E",
            "white": "#FFFFFF",
          },
        },
        "components": Object {
          "Button": Object {
            "baseStyle": Object {
              "_hover": Object {
                "opacity": "0.75",
              },
            },
            "variants": Object {
              "outline": Object {
                "background": "transparent",
                "border": "1.5px solid",
                "borderColor": "info.default",
                "borderRadius": "30px",
                "color": "info.default",
                "fontSize": "md",
                "fontWeight": "500",
                "height": "48px",
                "lineHeight": "157%",
                "padding": "4",
              },
              "primary": Object {
                "_hover": Object {
                  "_disabled": Object {
                    "background": "info.default",
                  },
                },
                "background": "info.default",
                "borderColor": "info.default",
                "borderRadius": "30px",
                "color": "white",
                "fontSize": "md",
                "fontWeight": "500",
                "height": "48px",
                "lineHeight": "157%",
                "padding": "4",
              },
              "shadow": Object {
                "_hover": Object {
                  "opacity": "0.75",
                },
                "background": "background.header",
                "boxShadow": "md",
              },
              "solid": Object {
                "_active": Object {
                  "bg": "#0376C9",
                },
                "_hover": Object {
                  "bg": "#0376C9",
                },
                "bg": "#24272A",
                "textColor": "white",
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
          "Link": Object {
            "baseStyle": Object {
              "color": "info.default",
            },
            "variants": Object {
              "box": Object {
                "backgroundColor": "background.alternative",
                "border": "1px solid",
                "borderColor": "border.default",
                "borderRadius": "lg",
                "display": "block",
                "paddingX": "4",
                "paddingY": "3",
                "width": "100%",
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
                "color": "text.muted",
                "fontSize": "sm",
                "fontWeight": "500",
                "marginBottom": "1",
                "textTransform": "uppercase",
              },
              "item": Object {
                "_hover": Object {
                  "background": "background.alternative",
                },
                "background": "none",
                "padding": "2",
              },
              "list": Object {
                "background": "background.menu",
                "border": "none",
                "borderRadius": "lg",
                "boxShadow": "lg",
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
                "bg": "chakra-body-bg",
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
                  "background": "chakra-body-bg",
                  "borderRadius": "3xl",
                  "padding": "6",
                },
              },
            },
          },
          "Skeleton": Object {
            "baseStyle": Object {
              "--skeleton-end-color": "colors.border",
              "--skeleton-start-color": "colors.background.alternative",
              "borderRadius": "lg",
            },
          },
          "Tabs": Object {
            "parts": Array [
              "root",
              "tab",
              "tablist",
              "tabpanel",
              "tabpanels",
              "indicator",
            ],
            "variants": Object {
              "line": Object {
                "tab": Object {
                  "& + &": Object {
                    "marginLeft": "4",
                  },
                  "_selected": Object {
                    "borderBottom": "2px solid",
                    "borderColor": "border.active",
                    "color": "text.tab.selected",
                  },
                  "background": "none",
                  "color": "text.tab",
                  "fontSize": "xs",
                  "fontWeight": "600",
                  "marginY": "3",
                  "outline": "none",
                  "paddingBottom": "0.5",
                  "paddingTop": "0",
                  "paddingX": "0",
                  "textTransform": "uppercase",
                },
                "tablist": Object {
                  "background": "background.alternative",
                  "borderBottom": "1px solid",
                  "borderColor": "border.default",
                  "paddingX": "4",
                },
              },
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
                  "background": "tag.category",
                  "lineHeight": "1.5",
                  "paddingX": "3",
                  "paddingY": "2",
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
              "muted": Object {
                "container": Object {
                  "backgroundColor": "tag.muted",
                  "color": "gray.muted",
                },
              },
            },
          },
          "Text": Object {
            "baseStyle": Object {
              "color": Object {
                "_dark": "white",
                "default": "black",
              },
            },
            "variants": Object {
              "muted": Object {
                "color": "text.muted",
              },
            },
          },
        },
        "config": Object {
          "initialColorMode": "system",
          "useSystemColorMode": true,
        },
        "fonts": Object {
          "body": "\\"Euclid Circular B\\", -apple-system, BlinkMacSystemFont, \\"Segoe UI\\", Roboto, Helvetica, Arial, sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\"",
          "code": "SFMono-Regular, Consolas, \\"Liberation Mono\\", Menlo, Courier, monospace",
          "heading": "\\"Euclid Circular B\\", -apple-system, BlinkMacSystemFont, \\"Segoe UI\\", Roboto, Helvetica, Arial, sans-serif, \\"Apple Color Emoji\\", \\"Segoe UI Emoji\\", \\"Segoe UI Symbol\\"",
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
                "_dark": "#1D1F22",
                "default": "#F5F5F5",
              },
              "body": Object {
                "_dark": "#141618",
                "default": "#F8FAFC",
              },
              "card": Object {
                "_dark": "#1D1F23",
                "default": "#FFFFFF",
              },
              "header": Object {
                "_dark": "rgba(29, 31, 35, 0.5)",
                "default": "rgba(255, 255, 255, 0.75)",
              },
              "hover": Object {
                "_dark": "#2F3338",
                "default": "#FAFBFC",
              },
              "menu": Object {
                "_dark": "#282B2E",
                "default": "#FFFFFF",
              },
            },
            "border": Object {
              "active": Object {
                "_dark": "rgba(255, 255, 255, 0.06)",
                "default": "#24272A",
              },
              "default": Object {
                "_dark": "#3B4046",
                "default": "#D6D9DC",
              },
            },
            "gray": Object {
              "light": Object {
                "_dark": "#1A1C1F",
                "default": "#F1F1F1",
              },
              "muted": Object {
                "_dark": "#D6D9DC",
                "default": "#878787",
              },
            },
            "icon": Object {
              "alternative": Object {
                "_dark": "#141618",
                "default": "#F2F4F6",
              },
              "muted": Object {
                "default": "#6A737D",
              },
            },
            "info": Object {
              "default": Object {
                "_dark": "#1098FC",
                "default": "#0376C9",
              },
              "muted": Object {
                "_dark": "#141618",
                "default": "rgba(3, 118, 201, 0.1)",
              },
            },
            "tag": Object {
              "category": Object {
                "_dark": "rgba(16, 152, 252, 0.15)",
                "default": "info.muted",
              },
              "muted": Object {
                "_dark": "#141618",
                "default": "#F5F5F5",
              },
            },
            "text": Object {
              "_dark": "#9FA6AE",
              "console": Object {
                "_dark": "#D6D9DC",
                "default": "#535A61",
              },
              "default": "#24272A",
              "muted": Object {
                "_dark": "#D6D9DC",
                "default": "#BBC0C5",
              },
              "tab": Object {
                "_dark": "#FFFFFF",
                "default": "#535A61",
                "selected": Object {
                  "_dark": "#FFFFFF",
                  "default": "#24272A",
                },
              },
            },
          },
        },
        "styles": Object {
          "global": Object {
            "body": Object {
              "background": "background.body",
              "overflowY": "scroll",
            },
          },
        },
      }
    `);
  });
});
