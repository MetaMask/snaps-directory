/* eslint-disable import/no-nodejs-modules */
import { detectSnapLocation, getSnapFiles } from '@metamask/snaps-controllers';
import type {
  SnapsRegistryDatabase,
  VerifiedSnap,
} from '@metamask/snaps-registry';
import { verify } from '@metamask/snaps-registry';
import {
  getLocalizedSnapManifest,
  getValidatedLocalizationFiles,
  type SnapManifest,
} from '@metamask/snaps-utils';
import { assert } from '@metamask/utils';
import deepEqual from 'fast-deep-equal';
import { rm } from 'fs/promises';
import type { GatsbyNode, NodeInput } from 'gatsby';
import {
  createFileNodeFromBuffer,
  createRemoteFileNode,
} from 'gatsby-source-filesystem';
import { GraphQLJSONObject } from 'graphql-type-json';
import type { RequestInfo, RequestInit } from 'node-fetch';
import fetch from 'node-fetch';
// @ts-expect-error - No types available for this package.
import { fetchBuilder, FileSystemCache } from 'node-fetch-cache';
import { resolve } from 'path';
import { NormalModuleReplacementPlugin } from 'webpack';

import { getLatestSnapVersion } from './src/utils';
import type { Fields } from './src/utils';
import {
  generateCategoryImage,
  generateInstalledImage,
  generateSnapImage,
} from './src/utils/images';

type Description = {
  description: string;
  trusted: boolean;
};

type SnapNode = NodeInput & {
  name: string;
  description: Description;
  author?:
    | {
        name: string;
        website: string;
      }
    | undefined;
  slug: string;
  latestVersion: string;
  icon?: string | undefined;
  permissionsJson: string;
};

// eslint-disable-next-line no-restricted-globals
const IS_STAGING = process.env.GATSBY_STAGING === 'true';
const REGISTRY_URL = 'https://acl.execution.metamask.io/latest/registry.json';
const SIGNATURE_URL = 'https://acl.execution.metamask.io/latest/signature.json';
const PUBLIC_KEY =
  '0x025b65308f0f0fb8bc7f7ff87bfc296e0330eee5d3c1d1ee4a048b2fd6a86fa0a6';
const STATS_URL = 'https://data.snaps.metamask.io/';

const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
};

const LEGACY_CATEGORIES: Record<string, string> = {
  'transaction insights': 'security',
  notifications: 'communication',
};

/**
 * Normalize the description to ensure it ends with a period. This also replaces
 * "Metamask" with "MetaMask".
 *
 * @param description - The description to normalize.
 * @returns The normalized description.
 */
function normalizeDescription(description: string) {
  let normalizedDescription = description.trim();
  if (!description.endsWith('.') && !description.endsWith('!')) {
    normalizedDescription = `${description}.`;
  }

  return normalizedDescription.replace(/Metamask/gu, 'MetaMask');
}

/**
 * Get the description object for the given snap and manifest. If the registry
 * has a description, it will be used. Otherwise, the manifest description will
 * be used.
 *
 * @param snap - The snap data from the registry.
 * @param manifest - The snap manifest.
 * @returns The description object.
 */
function getDescription(
  snap: VerifiedSnap,
  manifest: SnapManifest,
): Description {
  if (snap.metadata.description) {
    return {
      description: normalizeDescription(snap.metadata.description),
      trusted: true,
    };
  }

  return {
    description: normalizeDescription(manifest.description),
    trusted: false,
  };
}

/**
 * Get the registry and custom fetch function to use for fetching tarballs.
 *
 * @returns The registry and custom fetch function.
 */
async function getRegistry() {
  const cachedTarballFetch = fetchBuilder.withCache(
    new FileSystemCache({ cacheDirectory: 'node_modules/.cache/npm/tarballs' }),
  );

  const fetchCachePath = 'node_modules/.cache/npm/fetch';
  const cachedFetch = fetchBuilder.withCache(
    new FileSystemCache({ cacheDirectory: fetchCachePath }),
  );

  const rawRegistry = await fetch(REGISTRY_URL, {
    headers: HEADERS,
  }).then(async (response) => response.text());

  const signature = await fetch(SIGNATURE_URL, {
    headers: HEADERS,
  }).then(async (response) => response.json());

  const isRegistryValid = verify({
    registry: rawRegistry,
    signature,
    publicKey: PUBLIC_KEY,
  });

  assert(isRegistryValid, 'Invalid registry signature.');

  const registry: SnapsRegistryDatabase = JSON.parse(rawRegistry);

  const cachedRegistry = await cachedFetch(REGISTRY_URL, {
    headers: HEADERS,
  }).then(async (response: any) => response.json());

  // If the registry has changed, we need to clear the fetch cache to ensure
  // that we get the latest tarballs.
  if (!deepEqual(cachedRegistry, registry)) {
    await rm(resolve(fetchCachePath), { recursive: true });
  }

  /**
   * Custom fetch function to use for fetching tarballs. This is used to cache
   * tarballs and decrease build times on subsequent builds.
   *
   * @param url - The URL to fetch.
   * @param options - The fetch options.
   * @returns The fetch response.
   */
  const customFetch = (url: RequestInfo, options?: RequestInit) => {
    if (url.toString().endsWith('.tgz')) {
      return cachedTarballFetch(url, options);
    }

    return cachedFetch(url, options);
  };

  return { registry, customFetch };
}

export const sourceNodes: GatsbyNode[`sourceNodes`] = async ({
  actions,
  createNodeId,
  createContentDigest,
  getNodesByType,
  cache,
  getCache,
}) => {
  const { createNode } = actions;
  const { registry, customFetch } = await getRegistry();

  const rawStats = await customFetch(STATS_URL, { headers: HEADERS }).then(
    async (response: any) => response.text(),
  );

  const stats = rawStats
    .split('\n')
    .slice(0, -1)
    .reduce((acc, json) => {
      const snap = JSON.parse(json);
      acc[snap.snap_id] = parseInt(snap.installs, 10);
      return acc;
    }, {});

  const verifiedSnaps = Object.values(registry.verifiedSnaps)
    .filter((snap) => IS_STAGING || Boolean(snap.metadata.category))
    .filter((snap) => IS_STAGING || snap.metadata.hidden !== true);

  for (const snap of verifiedSnaps) {
    const latestVersion = getLatestSnapVersion(snap);
    const location = detectSnapLocation(snap.id, {
      versionRange: latestVersion as any,
      fetch: customFetch as any,
    });

    const { result: rawManifest } = await location.manifest();
    const { iconPath } = rawManifest.source.location.npm;
    const icon = iconPath
      ? `data:image/svg+xml;utf8,${encodeURIComponent(
          (await location.fetch(iconPath)).toString(),
        )}`
      : undefined;

    const localizationFiles = await getSnapFiles(
      location,
      rawManifest.source.locales,
    );

    const validatedLocalizationFiles = getValidatedLocalizationFiles(
      localizationFiles,
    ).map((file) => file.result);

    // For now, just use the English translation
    const manifest = getLocalizedSnapManifest(
      rawManifest,
      'en',
      validatedLocalizationFiles,
    );

    const [snapLocation, slug] = snap.id.split(':') as [string, string];
    const summary = normalizeDescription(
      snap.metadata.summary ?? manifest.description,
    );

    const registryJson = await customFetch(
      `https://registry.npmjs.org/${slug}`,
    ).then(async (response: any) => response.json());

    const { time } = registryJson;

    const lastUpdated = new Date(time[latestVersion]).getTime();

    const installs = stats[snap.id] ?? 0;

    const nodeId = createNodeId(`snap__${snap.id}`);

    const screenshots = snap.metadata.screenshots ?? [];

    const screenshotNodes = await Promise.all(
      screenshots.map(async (path) =>
        createRemoteFileNode({
          url: new URL(
            path,
            'https://raw.githubusercontent.com/MetaMask/snaps-registry/main/src/',
          ).toString(),
          createNode,
          createNodeId,
          getCache,
          cache,
          parentNodeId: nodeId,
        }),
      ),
    );

    const migratedCategory =
      snap.metadata.category && LEGACY_CATEGORIES[snap.metadata.category];
    const category = migratedCategory ?? snap.metadata.category;

    const content = {
      ...snap.metadata,
      category,
      snapId: snap.id,
      name: manifest.proposedName,
      description: getDescription(snap, manifest),
      summary,
      location: snapLocation,
      slug,
      latestVersion,
      icon,
      installs,
      lastUpdated,

      screenshotFiles: screenshotNodes.map(
        (screenshotNode) => screenshotNode.id,
      ),

      // We need to stringify the permissions because Gatsby doesn't support
      // JSON objects in GraphQL out of the box. This field is turned into a
      // JSON object in the `createResolvers` function. The `permissionsJson`
      // field should not be used directly.
      permissionsJson: JSON.stringify(manifest.initialPermissions),
    };

    const node: SnapNode = {
      ...content,
      parent: null,
      children: [],
      id: nodeId,
      internal: {
        type: 'Snap',
        content: JSON.stringify(content),
        contentDigest: createContentDigest(content),
      },
    };

    await createNode(node);
  }

  const categories = Object.values(registry.verifiedSnaps).reduce(
    (result, snap) => {
      if (snap.metadata.category) {
        result.add(snap.metadata.category);
      }

      return result;
    },
    new Set<string>([
      ...Object.keys(LEGACY_CATEGORIES),
      ...Object.values(LEGACY_CATEGORIES),
    ]),
  );

  for (const category of categories) {
    // For legacy categories, we map to the new name.
    const legacyMapping = LEGACY_CATEGORIES[category];

    const categoryData = { name: category, legacyMapping };

    const node = {
      ...categoryData,
      parent: null,
      children: [],
      id: createNodeId(`category__${category}`),
      internal: {
        type: 'Category',
        content: JSON.stringify(categoryData),
        contentDigest: createContentDigest(categoryData),
      },
    };

    await createNode(node);
  }

  const snaps = getNodesByType('Snap') as unknown as Fields<
    Queries.Snap,
    'icon' | 'lastUpdated'
  >[];

  // The SEO banner that is used on the main `/installed` page. This is
  // statically queried by the name.
  const installedImage = await generateInstalledImage(snaps);
  await createFileNodeFromBuffer({
    buffer: installedImage,
    name: 'main-installed-banner',
    ext: '.png',
    createNode,
    createNodeId,
    cache,
    getCache,
  });

  // The SEO banner that is used on the main `/latest` page. This is
  // statically queried by the name.
  const latestImage = await generateCategoryImage(
    [...snaps].sort((a, b) => b.lastUpdated - a.lastUpdated).slice(0, 6),
    6,
  );

  await createFileNodeFromBuffer({
    buffer: latestImage,
    name: 'latest-banner',
    ext: '.png',
    createNode,
    createNodeId,
    cache,
    getCache,
  });
};

/**
 * Create the schema customization for the Snap and Category nodes. This adds
 * the `banner` field to the Snap and Category nodes.
 *
 * @param args - The Gatsby arguments.
 * @param args.actions - The Gatsby actions.
 * @see https://www.gatsbyjs.com/docs/reference/graphql-data-layer/schema-customization/#creating-type-definitions
 */
export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  ({ actions }) => {
    const { createTypes } = actions;

    createTypes(`
      type Snap implements Node {
        banner: File @link(from: "fields.localFile")
        onboard: Boolean
        privateCode: Boolean
        additionalSourceCode: [SnapAdditionalSourceCode]
        privacyPolicy: String
        termsOfUse: String
        screenshots: [File] @link(from: "screenshotFiles")
      }

      type SnapAdditionalSourceCode {
        name: String
        url: String
      }

      type SnapSupport {
        keyRecovery: String
      }

      type Category implements Node {
        banner: File @link(from: "fields.localFile")
        installedBanner: File @link(from: "fields.installedLocalFile")
      }
    `);
  };

/**
 * Create the banner images for the Snap and Category nodes.
 *
 * @param args - The Gatsby arguments.
 * @param args.node - The node that was created.
 * @param args.actions - The Gatsby actions.
 * @param args.createNodeId - A function to create a node ID.
 * @param args.cache - The Gatsby cache.
 * @param args.getCache - A function to get the Gatsby cache.
 * @param args.getNodesByType - A function to get nodes by type.
 */
export const onCreateNode: GatsbyNode[`onCreateNode`] = async ({
  node,
  actions,
  createNodeId,
  cache,
  getCache,
  getNodesByType,
}) => {
  if (node.internal.type === 'Snap') {
    const snapNode = node as unknown as Fields<
      Queries.Snap,
      keyof Queries.Snap
    >;

    const { createNode, createNodeField } = actions;
    const banner = await generateSnapImage(
      snapNode.name,
      snapNode.author?.name,
      snapNode.icon,
    );

    const bannerNode = await createFileNodeFromBuffer({
      buffer: banner,
      name: 'banner',
      ext: '.png',
      parentNodeId: snapNode.id,
      createNode,
      createNodeId,
      cache,
      getCache,
    });

    createNodeField({
      node,
      name: 'localFile',
      value: bannerNode.id,
    });
  }

  if (node.internal.type === 'Category') {
    const categoryNode = node as unknown as Fields<
      Queries.Category,
      keyof Queries.Category
    >;

    const { createNode, createNodeField } = actions;
    const name = categoryNode.legacyMapping ?? categoryNode.name;
    const snaps = getNodesByType('Snap').filter(
      (snap) => snap.category === name,
    ) as unknown as Fields<Queries.Snap, keyof Queries.Snap>[];

    const banner = await generateCategoryImage(snaps);
    const bannerNode = await createFileNodeFromBuffer({
      buffer: banner,
      name: 'banner',
      ext: '.png',
      parentNodeId: categoryNode.id,
      createNode,
      createNodeId,
      cache,
      getCache,
    });

    createNodeField({
      node,
      name: 'localFile',
      value: bannerNode.id,
    });

    const installedBanner = await generateInstalledImage(snaps);
    const installedBannerNode = await createFileNodeFromBuffer({
      buffer: installedBanner,
      name: 'installed-banner',
      ext: '.png',
      parentNodeId: categoryNode.id,
      createNode,
      createNodeId,
      cache,
      getCache,
    });

    createNodeField({
      node,
      name: 'installedLocalFile',
      value: installedBannerNode.id,
    });
  }
};

/**
 * Create the resolvers for the Snap node. This adds the `permissions` field to
 * the Snap node.
 *
 * @param args - The Gatsby arguments.
 * @param args.createResolvers - The Gatsby createResolvers function.
 */
export const createResolvers: GatsbyNode['createResolvers'] = ({
  // eslint-disable-next-line @typescript-eslint/no-shadow
  createResolvers,
}) => {
  createResolvers({
    Snap: {
      permissions: {
        // Using `GraphQLJSONObject` here allows us to query the permissions
        // object in GraphQL, without having to specify the fields.
        type: GraphQLJSONObject,
        resolve: ({ permissionsJson }: SnapNode) => {
          return JSON.parse(permissionsJson);
        },
      },
    },
  });
};

/**
 * Modify the Webpack configuration to handle SVGs using SVGR. This makes it
 * possible to import SVGs as React components.
 *
 * To do this we need to remove SVG from the default file-loader and add a new
 * rule for SVGs that uses `@svgr/webpack`.
 *
 * @param args - The Gatsby arguments.
 * @param args.actions - The Gatsby actions.
 * @param args.getConfig - A function to get the current Webpack configuration.
 */
export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
  getConfig,
}) => {
  const { replaceWebpackConfig } = actions;

  const config = getConfig();
  const rules = config.module.rules.map((rule: Record<string, unknown>) => {
    if (String(rule.test).includes('svg|')) {
      return {
        ...rule,
        test: /\.(ico|jpg|jpeg|png|gif|webp|avif)(\?.*)?$/u,
      };
    }

    return rule;
  });

  replaceWebpackConfig({
    ...config,
    plugins: [
      ...config.plugins,
      new NormalModuleReplacementPlugin(/node:/u, (resource) => {
        resource.request = resource.request.replace(/^node:/u, '');
      }),
    ],
    resolve: {
      ...config.resolve,
      fallback: {
        ...config.resolve.fallback,
        assert: false,
        http: false,
        https: false,
        crypto: false,
        path: false,
        stream: false,
        url: false,
        util: false,
        zlib: false,
      },
    },
    module: {
      ...config.module,
      rules: [
        ...rules,
        {
          test: /\.svg$/u,
          issuer: /\.tsx?$/u,
          oneOf: [
            {
              loader: '@svgr/webpack',
              resourceQuery: /^((?!raw).)*$/u,
              options: {
                svgo: true,
                svgoConfig: {
                  plugins: ['removeTitle', 'removeDesc'],
                },
                svgProps: {
                  accessibilityRole: 'image',
                },
              },
            },
            {
              // Allows for importing SVGs as raw strings using
              // `import file from './file.svg?raw';`.
              resourceQuery: /raw/u,
              type: 'asset/resource',
            },
          ],
        },
      ],
    },
  });
};
