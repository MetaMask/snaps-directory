import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'MetaMask Snaps Directory',
    description:
      'Discover and customize your web3 experience with the MetaMask Snaps directory. Explore various community Snaps to enhance your web3 interactions and unlock new possibilities.',
    siteUrl: 'https://snaps.metamask.io',
    author: 'MetaMask',
  },
  graphqlTypegen: true,
  jsxRuntime: 'automatic',
  plugins: [
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-source-filesystem',
      options: { name: 'content', path: './src/pages' },
    },
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
      resolve: 'gatsby-plugin-fusejs',
      options: {
        query: `
          {
            allSnap {
              nodes {
                snapId
                name
                description
              }
            }
          }
        `,
        keys: ['snapId', 'name', 'description'],
        normalizer: ({ data }) =>
          data.allSnap.nodes.map((node) => ({
            snapId: node.snapId,
            name: node.name,
            description: node.description,
          })),
      },
    },
  ],
};

export default config;
