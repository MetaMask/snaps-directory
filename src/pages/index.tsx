import { Box, SimpleGrid } from "@chakra-ui/react";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Seo } from "../components/SEO";
import { Snap } from "../components/Snap";
import { Layout } from "../components/Layout";

const IndexPage = () => {
  const rawData = useStaticQuery(graphql`
    query SnapsQuery {
      allSnap {
        nodes {
          snapId
          name
          description
          svgIcon
          latestVersion
        }
      }
    }
  `);

  const snaps = rawData.allSnap.nodes;

  return (
    <>
      <Seo />
      <Layout>
        <Box py="4" px="8">
          <SimpleGrid minChildWidth="300px" spacing={4}>
            {snaps
              .filter((snap) => !snap.snapId.endsWith("example-snap"))
              .map((snap) => (
                <Snap {...snap} />
              ))}
          </SimpleGrid>
        </Box>
      </Layout>
    </>
  );
};

export default IndexPage;
