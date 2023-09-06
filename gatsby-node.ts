/* eslint-disable import/no-nodejs-modules */
import { detectSnapLocation } from '@metamask/snaps-controllers/dist/snaps/location';
import deepEqual from 'fast-deep-equal';
import { rm } from 'fs/promises';
import type { GatsbyNode } from 'gatsby';
import type { RequestInfo, RequestInit } from 'node-fetch';
import fetch from 'node-fetch';
import { fetchBuilder, FileSystemCache } from 'node-fetch-cache';
import path from 'path';
import semver from 'semver/preload';

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

export const sourceNodes: GatsbyNode[`sourceNodes`] = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  const registryUrl = 'https://acl.execution.consensys.io/latest/registry.json';

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

  const registry = await fetch(registryUrl, { headers }).then(
    async (response) => response.json(),
  );

  const cachedRegistry = await cachedFetch(registryUrl, { headers }).then(
    async (response) => response.json(),
  );

  if (!deepEqual(cachedRegistry, registry)) {
    await rm(path.resolve(fetchCachePath), { recursive: true });
  }

  const customFetch = (url: RequestInfo, options: RequestInit | undefined) => {
    if (url.toString().endsWith('.tgz')) {
      return cachedTarballFetch(url, options);
    }
    return cachedFetch(url, options);
  };

  // TODO: Fix types.
  const verifiedSnaps: any[] = Object.values(registry.verifiedSnaps);

  for (const snap of verifiedSnaps) {
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
    const svgIcon = iconPath
      ? `data:image/svg+xml;utf8,${encodeURIComponent(
          (await location.fetch(iconPath)).toString(),
        )}`
      : undefined;

    const content = {
      ...snap.metadata,
      snapId: snap.id,
      name: snap.metadata.name,
      description: normalizeDescription(manifest.description),
      slug: snap.metadata.name.toLowerCase().replace(/\s/gu, '-'),
      latestVersion,
      svgIcon,
    };

    const node = {
      ...content,
      parent: null,
      children: [],
      id: createNodeId(`snap__${snap.id as string}`),
      internal: {
        type: 'Snap',
        content: JSON.stringify(content),
        contentDigest: createContentDigest(content),
      },
    };

    await createNode(node);
  }
};
