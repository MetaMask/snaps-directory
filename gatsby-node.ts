import type { GatsbyNode } from 'gatsby';
import fetch from 'node-fetch';
// eslint-disable-next-line import/no-nodejs-modules
import { resolve } from 'path';
import semver from 'semver/preload';

export const sourceNodes: GatsbyNode[`sourceNodes`] = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions;

  const registry = await fetch(
    'https://raw.githubusercontent.com/MetaMask/snaps-registry/main/src/registry.json',
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

    // const location = detectSnapLocation(snap.id, {
    //   versionRange: latestVersion as any,
    // });
    //
    // const { result: manifest } = await location.manifest();
    // const { iconPath } = manifest.source.location.npm;
    // const svgIcon = iconPath
    //   ? `data:image/svg+xml;utf8,${encodeURIComponent(
    //       (await location.fetch(iconPath)).toString(),
    //     )}`
    //   : undefined;

    const content = {
      snapId: snap.id,
      name: snap.metadata.name,
      description: 'a', // manifest.description,
      latestVersion,
      svgIcon: 'a',
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

export const onCreateWebpackConfig: GatsbyNode[`onCreateWebpackConfig`] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    externals: {
      'node:crypto': 'commonjs crypto',
    },
    resolve: {
      fallback: {
        crypto: false,
        fs: false,
        os: false,
        path: false,
        stream: false,
        tty: false,
        // eslint-disable-next-line no-restricted-globals
        util: resolve(__dirname, 'node_modules/util/util.js'),
      },
    },
  });
};
