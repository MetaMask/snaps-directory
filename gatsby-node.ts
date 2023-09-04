import { detectSnapLocation } from '@metamask/snaps-controllers/dist/snaps/location';
import type { GatsbyNode } from 'gatsby';
import type { RequestInfo, RequestInit } from 'node-fetch';
import fetch from 'node-fetch';
import { fetchBuilder, FileSystemCache } from 'node-fetch-cache';
// eslint-disable-next-line import/no-nodejs-modules
import semver from 'semver/preload';

export const sourceNodes: GatsbyNode[`sourceNodes`] = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  const registry = await fetch(
    'https://acl.execution.consensys.io/latest/registry.json',
    {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
      },
    },
  ).then(async (response) => response.json());

  const cachedFetch = fetchBuilder.withCache(
    new FileSystemCache({ cacheDirectory: '.cache/npm' }),
  );

  const customFetch = (url: RequestInfo, options: RequestInit | undefined) => {
    if (url.toString().endsWith('.tgz')) {
      return cachedFetch(url, options);
    }
    return fetch(url, options);
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
      snapId: snap.id,
      name: snap.metadata.name,
      description: manifest.description,
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
