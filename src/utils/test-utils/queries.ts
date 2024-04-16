import type { InitialPermissions } from '@metamask/snaps-sdk';

import { RegistrySnapCategory } from '../../constants';
import type { Fields, Screenshot } from '../snaps';

export type GetMockSiteMetadataArgs = {
  title?: string;
  description?: string;
  author?: string;
  siteUrl?: string;
};

/**
 * Get mock site metadata in the shape of a GraphQL query response.
 *
 * @param args - The arguments. The default values are the same as the default
 * values in `gatsby-config.ts`.
 * @param args.title - The title.
 * @param args.description - The description.
 * @param args.author - The author.
 * @param args.siteUrl - The site URL.
 * @returns The mock site metadata.
 */
export function getMockSiteMetadata({
  title = 'MetaMask Snaps Directory',
  description = 'Explore community-built Snaps to customize your web3 experience via our official directory.',
  author = 'MetaMask',
  siteUrl = 'https://snaps.metamask.io',
}: GetMockSiteMetadataArgs = {}): {
  site: {
    siteMetadata: Fields<
      Queries.SiteSiteMetadata,
      'title' | 'description' | 'author' | 'siteUrl'
    >;
  };
} {
  return {
    site: {
      siteMetadata: {
        title,
        description,
        author,
        siteUrl,
      },
    },
  };
}

/**
 * Get mock page context in the shape of a Gatsby page context.
 *
 * @param args - The arguments.
 * @param args.locale - The locale.
 * @returns The mock page context.
 */
export function getMockPageContext({ locale = 'en-US' } = {}) {
  return {
    locale,
  };
}

/**
 * Get mock data for screenshots.
 *
 * @returns Mock data for screenshots.
 */
export function getMockScreenshots() {
  return [
    {
      childImageSharp: {
        medium: {
          layout: 'fixed',
          backgroundColor: '#181828',
          images: {
            fallback: {
              src: '/static/7e10f91462adb6ce05b1d0e9b02535b8/758b3/7e10f91462adb6ce05b1d0e9b02535b8.png',
              srcSet:
                '/static/7e10f91462adb6ce05b1d0e9b02535b8/758b3/7e10f91462adb6ce05b1d0e9b02535b8.png 400w,\n/static/7e10f91462adb6ce05b1d0e9b02535b8/a0dad/7e10f91462adb6ce05b1d0e9b02535b8.png 800w',
              sizes: '400px',
            },
            sources: [
              {
                srcSet:
                  '/static/7e10f91462adb6ce05b1d0e9b02535b8/e5289/7e10f91462adb6ce05b1d0e9b02535b8.webp 400w,\n/static/7e10f91462adb6ce05b1d0e9b02535b8/490e2/7e10f91462adb6ce05b1d0e9b02535b8.webp 800w',
                type: 'image/webp',
                sizes: '400px',
              },
            ],
          },
          width: 400,
          height: 225,
        },
        large: {
          layout: 'constrained',
          backgroundColor: '#181828',
          images: {
            fallback: {
              src: '/static/7e10f91462adb6ce05b1d0e9b02535b8/f5e84/7e10f91462adb6ce05b1d0e9b02535b8.png',
              srcSet:
                '/static/7e10f91462adb6ce05b1d0e9b02535b8/d0a15/7e10f91462adb6ce05b1d0e9b02535b8.png 240w,\n/static/7e10f91462adb6ce05b1d0e9b02535b8/c6b60/7e10f91462adb6ce05b1d0e9b02535b8.png 480w,\n/static/7e10f91462adb6ce05b1d0e9b02535b8/f5e84/7e10f91462adb6ce05b1d0e9b02535b8.png 960w',
              sizes: '(min-width: 960px) 960px, 100vw',
            },
            sources: [
              {
                srcSet:
                  '/static/7e10f91462adb6ce05b1d0e9b02535b8/4a319/7e10f91462adb6ce05b1d0e9b02535b8.webp 240w,\n/static/7e10f91462adb6ce05b1d0e9b02535b8/0df1a/7e10f91462adb6ce05b1d0e9b02535b8.webp 480w,\n/static/7e10f91462adb6ce05b1d0e9b02535b8/eeb31/7e10f91462adb6ce05b1d0e9b02535b8.webp 960w',
                type: 'image/webp',
                sizes: '(min-width: 960px) 960px, 100vw',
              },
            ],
          },
          width: 960,
          height: 540,
        },
      },
    },
    {
      childImageSharp: {
        medium: {
          layout: 'fixed',
          backgroundColor: '#282828',
          images: {
            fallback: {
              src: '/static/01d53b165dac0be84479c8766b65d57b/758b3/01d53b165dac0be84479c8766b65d57b.png',
              srcSet:
                '/static/01d53b165dac0be84479c8766b65d57b/758b3/01d53b165dac0be84479c8766b65d57b.png 400w,\n/static/01d53b165dac0be84479c8766b65d57b/a0dad/01d53b165dac0be84479c8766b65d57b.png 800w',
              sizes: '400px',
            },
            sources: [
              {
                srcSet:
                  '/static/01d53b165dac0be84479c8766b65d57b/e5289/01d53b165dac0be84479c8766b65d57b.webp 400w,\n/static/01d53b165dac0be84479c8766b65d57b/490e2/01d53b165dac0be84479c8766b65d57b.webp 800w',
                type: 'image/webp',
                sizes: '400px',
              },
            ],
          },
          width: 400,
          height: 225,
        },
        large: {
          layout: 'constrained',
          backgroundColor: '#282828',
          images: {
            fallback: {
              src: '/static/01d53b165dac0be84479c8766b65d57b/f5e84/01d53b165dac0be84479c8766b65d57b.png',
              srcSet:
                '/static/01d53b165dac0be84479c8766b65d57b/d0a15/01d53b165dac0be84479c8766b65d57b.png 240w,\n/static/01d53b165dac0be84479c8766b65d57b/c6b60/01d53b165dac0be84479c8766b65d57b.png 480w,\n/static/01d53b165dac0be84479c8766b65d57b/f5e84/01d53b165dac0be84479c8766b65d57b.png 960w',
              sizes: '(min-width: 960px) 960px, 100vw',
            },
            sources: [
              {
                srcSet:
                  '/static/01d53b165dac0be84479c8766b65d57b/4a319/01d53b165dac0be84479c8766b65d57b.webp 240w,\n/static/01d53b165dac0be84479c8766b65d57b/0df1a/01d53b165dac0be84479c8766b65d57b.webp 480w,\n/static/01d53b165dac0be84479c8766b65d57b/eeb31/01d53b165dac0be84479c8766b65d57b.webp 960w',
                type: 'image/webp',
                sizes: '(min-width: 960px) 960px, 100vw',
              },
            ],
          },
          width: 960,
          height: 540,
        },
      },
    },
    {
      childImageSharp: {
        medium: {
          layout: 'fixed',
          backgroundColor: '#182828',
          images: {
            fallback: {
              src: '/static/a20f0f9585a4e848a0cb828a29a4de09/758b3/a20f0f9585a4e848a0cb828a29a4de09.png',
              srcSet:
                '/static/a20f0f9585a4e848a0cb828a29a4de09/758b3/a20f0f9585a4e848a0cb828a29a4de09.png 400w,\n/static/a20f0f9585a4e848a0cb828a29a4de09/a0dad/a20f0f9585a4e848a0cb828a29a4de09.png 800w',
              sizes: '400px',
            },
            sources: [
              {
                srcSet:
                  '/static/a20f0f9585a4e848a0cb828a29a4de09/e5289/a20f0f9585a4e848a0cb828a29a4de09.webp 400w,\n/static/a20f0f9585a4e848a0cb828a29a4de09/490e2/a20f0f9585a4e848a0cb828a29a4de09.webp 800w',
                type: 'image/webp',
                sizes: '400px',
              },
            ],
          },
          width: 400,
          height: 225,
        },
        large: {
          layout: 'constrained',
          backgroundColor: '#182828',
          images: {
            fallback: {
              src: '/static/a20f0f9585a4e848a0cb828a29a4de09/f5e84/a20f0f9585a4e848a0cb828a29a4de09.png',
              srcSet:
                '/static/a20f0f9585a4e848a0cb828a29a4de09/d0a15/a20f0f9585a4e848a0cb828a29a4de09.png 240w,\n/static/a20f0f9585a4e848a0cb828a29a4de09/c6b60/a20f0f9585a4e848a0cb828a29a4de09.png 480w,\n/static/a20f0f9585a4e848a0cb828a29a4de09/f5e84/a20f0f9585a4e848a0cb828a29a4de09.png 960w',
              sizes: '(min-width: 960px) 960px, 100vw',
            },
            sources: [
              {
                srcSet:
                  '/static/a20f0f9585a4e848a0cb828a29a4de09/4a319/a20f0f9585a4e848a0cb828a29a4de09.webp 240w,\n/static/a20f0f9585a4e848a0cb828a29a4de09/0df1a/a20f0f9585a4e848a0cb828a29a4de09.webp 480w,\n/static/a20f0f9585a4e848a0cb828a29a4de09/eeb31/a20f0f9585a4e848a0cb828a29a4de09.webp 960w',
                type: 'image/webp',
                sizes: '(min-width: 960px) 960px, 100vw',
              },
            ],
          },
          width: 960,
          height: 540,
        },
      },
    },
  ];
}

export type MockSnap = Fields<
  Queries.Snap,
  | 'id'
  | 'name'
  | 'icon'
  | 'snapId'
  | 'description'
  | 'summary'
  | 'latestVersion'
  | 'website'
  | 'onboard'
  | 'category'
  | 'author'
  | 'sourceCode'
  | 'additionalSourceCode'
  | 'audits'
  | 'banner'
  | 'support'
  | 'gatsbyPath'
  | 'installs'
  | 'lastUpdated'
  | 'permissions'
  | 'privateCode'
  | 'privacyPolicy'
  | 'termsOfUse'
> & { screenshots: Screenshot[] };

export type GetMockSnapArgs = {
  id?: string;
  name?: string;
  icon?: string | null;
  snapId?: string;
  description?: Fields<Queries.SnapDescription, 'description' | 'trusted'>;
  summary?: string;
  latestVersion?: string;
  website?: string;
  onboard?: boolean;
  category?: RegistrySnapCategory | undefined;
  author?: Fields<Queries.SnapAuthor, 'name' | 'website'>;
  sourceCode?: string;
  additionalSourceCode?: {
    url: string;
    name: string;
  }[];
  audits?: Fields<Queries.SnapAudits, 'auditor' | 'report'>[];
  banner?: Fields<Queries.File, 'publicURL'>;
  support?: Partial<
    Fields<
      Queries.SnapSupport,
      'contact' | 'faq' | 'knowledgeBase' | 'keyRecovery'
    >
  >;
  gatsbyPath?: string;
  installs?: number;
  lastUpdated?: number;
  permissions?: InitialPermissions;
  privateCode?: boolean;
  privacyPolicy?: string;
  termsOfUse?: string;
  screenshots?: any[];
};

/**
 * Get mock snap data in the shape of a GraphQL query response.
 *
 * @param args - The arguments.
 * @param args.id - The ID.
 * @param args.name - The name.
 * @param args.icon - The icon.
 * @param args.snapId - The snap ID.
 * @param args.description - The description.
 * @param args.summary - The summary.
 * @param args.latestVersion - The latest version.
 * @param args.website - The website.
 * @param args.onboard - Whether the snap is onboarded.
 * @param args.category - The category.
 * @param args.author - The author.
 * @param args.sourceCode - The source code URL.
 * @param args.additionalSourceCode - Additional source code URLs.
 * @param args.audits - The audits.
 * @param args.banner - The banner.
 * @param args.support - The support page URL.
 * @param args.gatsbyPath - The Gatsby path.
 * @param args.installs - The number of installs.
 * @param args.lastUpdated - A unix timestamp of the last update to the snap.
 * @param args.permissions - The Snap's initial permissions.
 * @param args.privateCode - Whether the Snap's source code is (partially)
 * private.
 * @param args.privacyPolicy - The privacy policy URL.
 * @param args.termsOfUse - The terms of use URL.
 * @param args.screenshots - The screenshots.
 * @returns The mock snap data.
 */
export function getMockSnap({
  id = 'id',
  name = 'Snap',
  icon = 'https://example.com/icon.png',
  snapId = 'snap-id',
  description = {
    description: 'Description',
    trusted: true,
  },
  summary = 'Summary',
  latestVersion = '1.0.0',
  website = 'https://example.com',
  onboard = false,
  category = RegistrySnapCategory.Security,
  author = {
    name: 'Author',
    website: 'https://example.com/author',
  },
  sourceCode = 'https://example.com/source-code',
  additionalSourceCode = [],
  audits = [
    {
      auditor: 'Auditor',
      report: 'https://example.com/report',
    },
  ],
  banner = {
    publicURL: 'https://example.com/banner.png',
  },
  support = {
    contact: 'https://example.com/contact',
    faq: 'https://example.com/faq',
    knowledgeBase: 'https://example.com/knowledge-base',
    keyRecovery: 'https://example.com/key-recovery',
  },
  gatsbyPath = `/snap/${snapId}`,
  installs = 0,
  lastUpdated = 1701260892,
  permissions = {
    'endowment:rpc': {
      dapps: true,
    },
  },
  privateCode = false,
  privacyPolicy = 'https://example.com/privacyPolicy',
  termsOfUse = 'https://example.com/termsOfUse',
  screenshots = getMockScreenshots(),
}: GetMockSnapArgs = {}): { snap: MockSnap } {
  return {
    snap: {
      id,
      name,
      icon: icon as string,
      snapId,
      description,
      summary,
      latestVersion,
      website,
      onboard,
      category,
      author,
      sourceCode,
      additionalSourceCode,
      audits,
      banner: banner as Fields<Queries.File, keyof Queries.File>,
      support: support as Fields<
        Queries.SnapSupport,
        keyof Queries.SnapSupport
      >,
      gatsbyPath,
      installs,
      lastUpdated,
      permissions,
      privateCode,
      privacyPolicy,
      termsOfUse,
      screenshots,
    },
  };
}

export type GetMockCategoryArgs = {
  name?: RegistrySnapCategory;
  banner?: Fields<Queries.File, 'publicURL'>;
  installedBanner?: Fields<Queries.File, 'publicURL'>;
};

/**
 * Get mock category data in the shape of a GraphQL query response.
 *
 * @param args - The arguments.
 * @param args.name - The name.
 * @param args.banner - The banner.
 * @param args.installedBanner - The installed banner.
 * @returns The mock category data.
 */
export function getMockCategory({
  name = RegistrySnapCategory.Security,
  banner = {
    publicURL: 'https://example.com/banner.png',
  },
  installedBanner = {
    publicURL: 'https://example.com/installed-banner.png',
  },
}: GetMockCategoryArgs = {}): {
  category: Fields<Queries.Category, 'name' | 'banner' | 'installedBanner'>;
} {
  return {
    category: {
      name,
      banner: banner as Fields<Queries.File, keyof Queries.File>,
      installedBanner: installedBanner as Fields<
        Queries.File,
        keyof Queries.File
      >,
    },
  };
}
