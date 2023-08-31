import { GatsbyNode } from "gatsby";
import fetch from "node-fetch";

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

  verifiedSnaps.forEach((snap) => {
    const content = {
      snapId: snap.id,
      metadata: snap.metadata,
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
  });
};
