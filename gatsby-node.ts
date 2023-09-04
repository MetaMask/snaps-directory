import { detectSnapLocation } from '@metamask/snaps-controllers/dist/snaps/location';
import type { GatsbyNode } from 'gatsby';
import fetch from 'node-fetch';
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
  ).then(async (response) => response.json());

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
