/* eslint-disable import/no-nodejs-modules */
import { detectSnapLocation } from '@metamask/snaps-controllers/dist/snaps/location';
import type { SnapsRegistryDatabase } from '@metamask/snaps-registry';
import type { SnapManifest } from '@metamask/snaps-utils';
import deepEqual from 'fast-deep-equal';
import { rm } from 'fs/promises';
import type { GatsbyNode, NodeInput } from 'gatsby';
import { createFileNodeFromBuffer } from 'gatsby-source-filesystem';
import type { RequestInfo, RequestInit } from 'node-fetch';
import fetch from 'node-fetch';
import { fetchBuilder, FileSystemCache } from 'node-fetch-cache';
import path from 'path';
import semver from 'semver/preload';

import { generateImage } from './src/utils/images';

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

type VerifiedSnap = SnapsRegistryDatabase['verifiedSnaps'][string];

const REGISTRY_URL = 'https://acl.execution.consensys.io/latest/registry.json';

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
    new FileSystemCache({ cacheDirectory: '.cache/npm/tarballs' }),
  );

  const fetchCachePath = '.cache/npm/fetch';
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
  const customFetch = (url: RequestInfo, options: RequestInit | undefined) => {
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
}) => {
  const { createNode } = actions;
  const { registry, customFetch } = await getRegistry();

  // TODO: Fix types.
  const verifiedSnaps = Object.values(registry.verifiedSnaps);

  for (const snap of verifiedSnaps) {
    if (snap.id.endsWith('example-snap')) {
      continue;
    }

    const latestVersion = Object.keys(snap.versions).reduce(
      (result, version) => {
        if (result === null || semver.gt(version, result)) {
          return version;
        }

        return result;
      },
    );

    const location = detectSnapLocation(snap.id, {
      versionRange: latestVersion as any,
      fetch: customFetch as any,
    });

    const { result: manifest } = await location.manifest();
    const { iconPath } = manifest.source.location.npm;
    const icon = iconPath
      ? `data:image/svg+xml;utf8,${encodeURIComponent(
          (await location.fetch(iconPath)).toString(),
        )}`
      : undefined;

    const [snapLocation, slug] = snap.id.split(':') as [string, string];
    const summary = normalizeDescription(
      snap.metadata.summary ?? manifest.description,
    );

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
};

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] =
  ({ actions }) => {
    const { createTypes } = actions;

    // Until at least one snap has a knowledge base link we have to do this manually
    createTypes(`
      type SnapSupport {
        contact: String
        faq: String
        knowledgeBase: String
      }

      type Snap implements Node {
        banner: File @link(from: "fields.localFile")
        support: SnapSupport
      }
    `);
  };

export const onCreateNode: GatsbyNode[`onCreateNode`] = async ({
  node,
  actions,
  createNodeId,
  cache,
  getCache,
}) => {
  if (node.internal.type !== 'Snap') {
    return;
  }

  const snapNode = node as unknown as SnapNode;
  const { createNode, createNodeField } = actions;

  const banner = await generateImage(
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
};
