import { GatsbyNode } from "gatsby";
import fetch from "node-fetch";
import { detectSnapLocation } from "@metamask/snaps-controllers/dist/snaps/location";
import semver from "semver/preload";

export const sourceNodes: GatsbyNode[`sourceNodes`] = async ({
  actions,
  createNodeId,
  createContentDigest,
  store,
  cache,
  reporter,
}) => {
  const { createNode } = actions;

  const registry = await fetch(
    "https://raw.githubusercontent.com/MetaMask/snaps-registry/main/src/registry.json"
  ).then((response) => response.json());

  const verifiedSnaps = Object.values(registry.verifiedSnaps);

  for (const snap of verifiedSnaps) {
    const latestVersion = Object.keys(snap.versions).reduce(
      (result, version) => {
        if (result === null || semver.gt(version, result)) {
          return version;
        }

        return result;
      }
    );

    const location = detectSnapLocation(snap.id, {
      versionRange: latestVersion as any,
    });
    const { result: manifest } = await location.manifest();
    const { iconPath } = manifest.source.location.npm;
    const svgIcon = iconPath
      ? `data:image/svg+xml;utf8,${encodeURIComponent(
          (await location.fetch(iconPath)).toString()
        )}`
      : undefined;

    const content = {
      snapId: snap.id,
      name: snap.metadata.name,
      description: manifest.description,
      latestVersion,
      svgIcon,
    };
    const node = {
      ...content,
      parent: null,
      children: [],
      id: createNodeId(`snap__${snap.id}`),
      internal: {
        type: "Snap",
        content: JSON.stringify(content),
        contentDigest: createContentDigest(content),
      },
    };
    createNode(node);
  }
};
