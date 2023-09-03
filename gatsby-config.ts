import type { GatsbyConfig } from 'gatsby';
import { resolve } from 'path';

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Snaps Directory',
    description: 'Discover and install MetaMask Snaps.',
    siteUrl: 'https://snaps.metamask.io',
    author: 'MetaMask',
  },
  graphqlTypegen: true,
  jsxRuntime: 'automatic',
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        /* eslint-disable @typescript-eslint/naming-convention */
        name: 'Snaps Directory',
        short_name: 'Snaps Directory',
        start_url: '/',
        display: 'standalone',
        icon: 'src/assets/favicon.svg',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        /* eslint-enable @typescript-eslint/naming-convention */
      },
    },
    {
      resolve: '@chakra-ui/gatsby-plugin',
      options: {
        /**
         * @property {boolean} [resetCSS=true]
         * if false, this plugin will not use `<CSSReset />
         */
        resetCSS: true,
        /**
         * @property {number} [portalZIndex=undefined]
         * The z-index to apply to all portal nodes. This is useful
         * if your app uses a lot z-index to position elements.
         */
        portalZIndex: undefined,
      },
    },
    {
      resolve: 'gatsby-theme-i18n',
      options: {
        defaultLang: 'en',
        // eslint-disable-next-line no-restricted-globals
        configPath: resolve(__dirname, './src/locales/config.json'),
      },
    },
    {
      resolve: 'gatsby-theme-i18n-lingui',
      options: {
        localeDir: './src/locales',
      },
    },
  ],
};

export default config;
