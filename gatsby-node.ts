/* eslint-disable import/no-nodejs-modules */
import { detectSnapLocation, getSnapFiles } from '@metamask/snaps-controllers';
import type {
  SnapsRegistryDatabase,
  VerifiedSnap,
} from '@metamask/snaps-registry';
import {
  getLocalizedSnapManifest,
  getValidatedLocalizationFiles,
  type SnapManifest,
} from '@metamask/snaps-utils';
import cryptoBrowserify from 'crypto-browserify';
import deepEqual from 'fast-deep-equal';
import { rm } from 'fs/promises';
import type { GatsbyNode, NodeInput } from 'gatsby';
import { createFileNodeFromBuffer } from 'gatsby-source-filesystem';
import type { RequestInfo, RequestInit } from 'node-fetch';
import fetch from 'node-fetch';
import { fetchBuilder, FileSystemCache } from 'node-fetch-cache';
import path from 'path';

import type { Fields } from './src/utils';
import { getLatestSnapVersion } from './src/utils';
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
};

// eslint-disable-next-line no-restricted-globals
const IS_STAGING = process.env.GATSBY_STAGING === 'true';
const REGISTRY_URL = 'https://acl.execution.metamask.io/latest/registry.json';

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
  const headers = {
    'User-Agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
  };

  const cachedTarballFetch = fetchBuilder.withCache(
    new FileSystemCache({ cacheDirectory: 'node_modules/.cache/npm/tarballs' }),
  );

  const fetchCachePath = 'node_modules/.cache/npm/fetch';
  const cachedFetch = fetchBuilder.withCache(
    new FileSystemCache({ cacheDirectory: fetchCachePath }),
  );

  const registry: SnapsRegistryDatabase = await fetch(REGISTRY_URL, {
    headers,
  }).then(async (response) => response.json());

  const cachedRegistry = await cachedFetch(REGISTRY_URL, { headers }).then(
    async (response: any) => response.json(),
  );

  // If the registry has changed, we need to clear the fetch cache to ensure
  // that we get the latest tarballs.
  if (!deepEqual(cachedRegistry, registry)) {
    await rm(path.resolve(fetchCachePath), { recursive: true });
  }

  /**
   * Custom fetch function to use for fetching tarballs. This is used to cache
   * tarballs and decrease build times on subsequent builds.
   *
   * @param url - The URL to fetch.
   * @param options - The fetch options.
   * @returns The fetch response.
   */
  const customFetch = async (url: RequestInfo, options?: RequestInit) => {
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

    const downloadsJson = await customFetch(
      `https://api.npmjs.org/downloads/point/last-year/${slug}`,
    ).then(async (response: any) => response.json());

    const { downloads } = downloadsJson;

    const content = {
      ...snap.metadata,
      snapId: snap.id,
      name: manifest.proposedName,
      description: getDescription(snap, manifest),
      summary,
      location: snapLocation,
      slug,
      latestVersion,
      icon,
      downloads,
      lastUpdated,
    };

    const node: SnapNode = {
      ...content,
      parent: null,
      children: [],
      id: createNodeId(`snap__${snap.id}`),
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
    new Set<string>(),
  );

  for (const category of categories) {
    const node = {
      name: category,
      parent: null,
      children: [],
      id: createNodeId(`category__${category}`),
      internal: {
        type: 'Category',
        content: JSON.stringify(category),
        contentDigest: createContentDigest(category),
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

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  ({ actions }) => {
    const { createTypes } = actions;

    createTypes(`
      type Snap implements Node {
        banner: File @link(from: "fields.localFile")
        onboard: Boolean
      }

      type Category implements Node {
        banner: File @link(from: "fields.localFile")
        installedBanner: File @link(from: "fields.installedLocalFile")
      }
    `);
  };

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
    const snaps = getNodesByType('Snap').filter(
      (snap) => snap.category === categoryNode.name,
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

  if (
    config?.externals &&
    typeof config.externals[0] === 'object' &&
    !Array.isArray(config.externals[0])
  ) {
    config.externals[0]['node:crypto'] = cryptoBrowserify;
  }

  replaceWebpackConfig({
    ...config,
    module: {
      ...config.module,
      rules: [
        ...rules,
        {
          test: /\.svg$/u,
          issuer: /\.tsx?$/u,
          use: [
            {
              loader: '@svgr/webpack',
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
          ],
        },
      ],
    },
  });
};
