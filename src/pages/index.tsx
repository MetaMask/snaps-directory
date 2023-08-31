import { Box, Center, Heading, SimpleGrid } from "@chakra-ui/react";
import { graphql, useStaticQuery } from "gatsby";
import React, { useState } from "react";
import { Seo } from "../components/SEO";
import { Snap } from "../components/Snap";

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
      <Box py="4" px="8">
        <Center mb="4">
          <Heading>Discover Snaps</Heading>
        </Center>
        <SimpleGrid minChildWidth="300px" spacing={4}>
          {snaps
            .filter((snap) => !snap.snapId.endsWith("example-snap"))
            .map((snap) => (
              <Snap {...snap} />
            ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default IndexPage;
