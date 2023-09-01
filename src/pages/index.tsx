import {
  Box,
  SimpleGrid,
  Container,
  Heading,
  Text,
  Flex,
  Link,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { graphql, Link as RouterLink } from 'gatsby';
import type { FunctionComponent } from 'react';

import { Icon, SnapCard } from '../components';
import type { Fields } from '../utils';

type IndexPageProps = {
  data: {
    allSnap: {
      nodes: Fields<
        Queries.Snap,
        'id' | 'snapId' | 'name' | 'description' | 'svgIcon' | 'gatsbyPath'
      >[];
    };
  };
};

const IndexPage: FunctionComponent<IndexPageProps> = ({ data }) => {
  const snaps = data.allSnap.nodes;

  return (
    <Container maxWidth="container.lg">
      <Flex direction="row" justifyContent="space-between" marginBottom="6">
        <Box maxWidth="400px" width="100%">
          <Heading as="h2" fontSize="2xl">
            Community Snaps
          </Heading>
          <Text>
            Discover snaps to customize your web3 experience via our official
            directory.{' '}
            <Link as={RouterLink} to="/">
              Read more
            </Link>{' '}
            and{' '}
            <Link as={RouterLink} to="/">
              FAQ
            </Link>
            .
          </Text>
        </Box>
        <Box maxWidth="400px" width="100%" marginTop="auto">
          <InputGroup background="white" borderRadius="full">
            <InputLeftElement pointerEvents="none">
              <Icon icon="search" width="20px" />
            </InputLeftElement>
            <Input borderRadius="full" placeholder="Search snaps..." />
          </InputGroup>
        </Box>
      </Flex>
      <Box>
        <SimpleGrid columns={[1, null, 2, 3]} spacing={4}>
          {snaps
            .filter((snap) => !snap.snapId.endsWith('example-snap'))
            .map((snap) => (
              <SnapCard key={snap.id} {...snap} />
            ))}
        </SimpleGrid>
      </Box>
    </Container>
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
