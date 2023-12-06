/* eslint-disable no-restricted-globals */
import type { GatsbyConfig } from 'gatsby';

const IS_STAGING = process.env.GATSBY_STAGING === 'true';
const STAGING_PATH_PREFIX = IS_STAGING
  ? `/${process.env.STAGING_PATH_PREFIX}`
  : '';

const SITE_URL = IS_STAGING
  ? `https://metamask.github.io`
  : 'https://snaps.metamask.io';

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'MetaMask Snaps Directory',
    description:
      'Explore community-built Snaps to customize your web3 experience via our official directory.',
    siteUrl: SITE_URL,
    author: 'MetaMask',
  },
  graphqlTypegen: true,
  jsxRuntime: 'automatic',
  pathPrefix: STAGING_PATH_PREFIX,
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
        name: 'MetaMask Snaps Directory',
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
                summary
                description {
                  description
                }
              }
            }
          }
        `,
        keys: ['snapId', 'name', 'summary', 'description'],
        normalizer: ({ data }) =>
          data.allSnap.nodes.map((node) => ({
            snapId: node.snapId,
            name: node.name,
            summary: node.summary,
            description: node.description.description,
          })),
      },
    },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://snaps.metamask.io',
        sitemap: 'https://snaps.metamask.io/sitemap-index.xml',
        policy: [{ userAgent: '*', allow: '/' }],
      },
    },
    ...(process.env.SEGMENT_PRODUCTION_WRITE_KEY ||
    process.env.SEGMENT_DEV_WRITE_KEY
      ? [
          {
            resolve: 'gatsby-plugin-segment-js',
            options: {
              prodKey: process.env.SEGMENT_PRODUCTION_WRITE_KEY,
              devKey: process.env.SEGMENT_DEV_WRITE_KEY,
            },
          },
        ]
      : []),
  ],
};

export default config;
