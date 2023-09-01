import { Box, SimpleGrid } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import type { FunctionComponent } from 'react';

import { SnapCard } from '../components/SnapCard';
import type { Fields } from '../utils';

type IndexPageProps = {
  data: {
    allSnap: {
      nodes: Queries.Snap[];
    };
  };
};

const IndexPage: FunctionComponent<IndexPageProps> = ({ data }) => {
  const snaps = data.allSnap.nodes;

  return (
    <Box py="4" px="8">
      <SimpleGrid minChildWidth="300px" spacing={4}>
        {snaps
          // TODO: Fix types.
          .filter((snap: any) => !snap.snapId.endsWith('example-snap'))
          .map((snap: any) => (
            <SnapCard key={snap.id} {...snap} />
          ))}
      </SimpleGrid>
    </Box>
  );
};

type HeadProps = {
  data: {
    site: {
      siteMetadata: Fields<
        Queries.SiteSiteMetadata,
        'title' | 'description' | 'author'
      >;
    };
  };
};

export const Head: FunctionComponent<HeadProps> = ({ data }) => (
  <>
    <html lang="en" />
    <title>{data.site.siteMetadata.title}</title>
    <meta name="description" content={data.site.siteMetadata.description} />
    <meta property="og:title" content={data.site.siteMetadata.title} />
    <meta
      property="og:description"
      content={data.site.siteMetadata.description}
    />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:creator" content={data.site.siteMetadata.author} />
    <meta name="twitter:title" content={data.site.siteMetadata.title} />
    <meta
      name="twitter:description"
      content={data.site.siteMetadata.description}
    />
  </>
);

export const query = graphql`
  query {
    allSnap {
      nodes {
        snapId
        name
        description
        svgIcon
        latestVersion
        gatsbyPath(filePath: "/snaps/{Snap.slug}")
      }
    }

    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;

export default IndexPage;
