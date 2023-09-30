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

export type MockSnap = Fields<
  Queries.Snap,
  | 'name'
  | 'icon'
  | 'snapId'
  | 'description'
  | 'latestVersion'
  | 'website'
  | 'onboard'
  | 'category'
  | 'author'
  | 'sourceCode'
  | 'audits'
  | 'banner'
  | 'support'
>;

export type GetMockSnapArgs = {
  name?: string;
  icon?: string;
  snapId?: string;
  description?: Fields<Queries.SnapDescription, 'description' | 'trusted'>;
  latestVersion?: string;
  website?: string;
  onboard?: boolean;
  category?: RegistrySnapCategory;
  author?: Fields<Queries.SnapAuthor, 'name' | 'website'>;
  sourceCode?: string;
  audits?: Fields<Queries.SnapAudits, 'auditor' | 'report'>[];
  banner?: Fields<Queries.File, 'publicURL'>;
  support?: Partial<
    Fields<Queries.SnapSupport, 'contact' | 'faq' | 'knowledgeBase'>
  >;
};

/**
 * Get mock snap data in the shape of a GraphQL query response.
 *
 * @param args - The arguments.
 * @param args.name - The name.
 * @param args.icon - The icon.
 * @param args.snapId - The snap ID.
 * @param args.description - The description.
 * @param args.latestVersion - The latest version.
 * @param args.website - The website.
 * @param args.onboard - Whether the snap is onboarded.
 * @param args.category - The category.
 * @param args.author - The author.
 * @param args.sourceCode - The source code URL.
 * @param args.audits - The audits.
 * @param args.banner - The banner.
 * @param args.support - The support page URL.
 * @returns The mock snap data.
 */
export function getMockSnap({
  name = 'Snap',
  icon = 'https://example.com/icon.png',
  snapId = 'snap-id',
  description = {
    description: 'Description',
    trusted: true,
  },
  latestVersion = '1.0.0',
  website = 'https://example.com',
  onboard = false,
  category = RegistrySnapCategory.TransactionInsights,
  author = {
    name: 'Author',
    website: 'https://example.com/author',
  },
  sourceCode = 'https://example.com/source-code',
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
  },
}: GetMockSnapArgs = {}): { snap: MockSnap } {
  return {
    snap: {
      name,
      icon,
      snapId,
      description,
      latestVersion,
      website,
      onboard,
      category,
      author,
      sourceCode,
      audits,
      banner: banner as Fields<Queries.File, keyof Queries.File>,
      support: support as Fields<
        Queries.SnapSupport,
        keyof Queries.SnapSupport
      >,
    },
  };
}

export type GetMockCategoryArgs = {
  name?: RegistrySnapCategory;
  banner?: Fields<Queries.File, 'publicURL'>;
};

/**
 * Get mock category data in the shape of a GraphQL query response.
 *
 * @param args - The arguments.
 * @param args.name - The name.
 * @param args.banner - The banner.
 * @returns The mock category data.
 */
export function getMockCategory({
  name = RegistrySnapCategory.TransactionInsights,
  banner = {
    publicURL: 'https://example.com/banner.png',
  },
}: GetMockCategoryArgs = {}): {
  category: Fields<Queries.Category, 'name' | 'banner'>;
} {
  return {
    category: {
      name,
      banner: banner as Fields<Queries.File, keyof Queries.File>,
    },
  };
}
