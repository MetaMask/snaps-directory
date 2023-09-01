import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `snaps-discover`,
    description: 'Discover and install MetaMask Snaps.',
    // TODO: Update URL.
    siteUrl: `https://metamask.io`,
    author: 'MetaMask',
  },
  graphqlTypegen: true,
  jsxRuntime: 'automatic',
  plugins: [
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
  ],
};

export default config;
