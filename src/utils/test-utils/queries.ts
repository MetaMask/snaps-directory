import type { InitialPermissions } from '@metamask/snaps-sdk';

import { RegistrySnapCategory } from '../../constants';
import type { Fields } from '../snaps';

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
  | 'downloads'
  | 'lastUpdated'
  | 'permissions'
  | 'privateCode'
  | 'privacyPolicy'
  | 'termsOfUse'
>;

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
  downloads?: number;
  lastUpdated?: number;
  permissions?: InitialPermissions;
  privateCode?: boolean;
  privacyPolicy?: string;
  termsOfUse?: string;
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
 * @param args.downloads - The number of downloads.
 * @param args.lastUpdated - A unix timestamp of the last update to the snap.
 * @param args.permissions - The Snap's initial permissions.
 * @param args.privateCode - Whether the Snap's source code is (partially)
 * private.
 * @param args.privacyPolicy - The privacy policy URL.
 * @param args.termsOfUse - The terms of use URL.
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
  category = RegistrySnapCategory.TransactionInsights,
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
  downloads = 0,
  lastUpdated = 1701260892,
  permissions = {
    'endowment:rpc': {
      dapps: true,
    },
  },
  privateCode = false,
  privacyPolicy = 'https://example.com/privacyPolicy',
  termsOfUse = 'https://example.com/termsOfUse',
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
      downloads,
      lastUpdated,
      permissions,
      privateCode,
      privacyPolicy,
      termsOfUse,
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
  name = RegistrySnapCategory.TransactionInsights,
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
