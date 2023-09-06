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
import { t, Trans } from '@lingui/macro';
import { graphql } from 'gatsby';
import shuffle from 'lodash/shuffle';
import type { ChangeEvent, FunctionComponent } from 'react';
import { useMemo, useState } from 'react';
import { useGatsbyPluginFusejs } from 'react-use-fusejs';

import { Icon, SnapCard } from '../components';
import { useInstalledSnaps } from '../hooks';
import type { Fields } from '../utils';

type IndexPageProps = {
  data: {
    allSnap: {
      nodes: Fields<
        Queries.Snap,
        'id' | 'snapId' | 'name' | 'description' | 'svgIcon' | 'gatsbyPath'
      >[];
    };
    fusejs: Queries.fusejs;
  };
};

const IndexPage: FunctionComponent<IndexPageProps> = ({ data }) => {
  const [query, setQuery] = useState('');
  const result = useGatsbyPluginFusejs<Queries.Snap>(query, data.fusejs);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_installedSnaps, _updateSnaps, cachedInstalledSnaps] =
    useInstalledSnaps();

  const shuffledSnaps = useMemo(
    () => shuffle(data.allSnap.nodes),
    [data.allSnap.nodes],
  );

  const sortedSnaps = useMemo(() => {
    // First we shuffle, then we sort installed snaps to the top.
    const sorted = shuffledSnaps.sort((a, b) => {
      const isSnapAInstalled = Boolean(cachedInstalledSnaps[a.snapId]);
      const isSnapBInstalled = Boolean(cachedInstalledSnaps[b.snapId]);
      if (isSnapAInstalled && !isSnapBInstalled) {
        return -1;
      } else if (isSnapBInstalled && !isSnapAInstalled) {
        return 1;
      }

      return 0;
    });

    return sorted;
  }, [shuffledSnaps, cachedInstalledSnaps]);

  const snaps =
    query.length > 0
      ? result.map((searchResult) =>
          sortedSnaps.find(({ snapId }) => searchResult.item.snapId === snapId),
        )
      : sortedSnaps;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <Container maxWidth="container.xl">
      <Flex direction="row" justifyContent="space-between" marginBottom="6">
        <Box maxWidth="400px" width="100%">
          <Heading as="h2" fontSize="2xl" marginBottom="1">
            <Trans>Discover Snaps</Trans>
          </Heading>
          <Text>
            <Trans>
              Discover snaps to customize your web3 experience via our official
              directory.{' '}
              <Link href="https://metamask.io/snaps/" isExternal={true}>
                Learn more
              </Link>{' '}
              and{' '}
              <Link
                href="https://support.metamask.io/hc/en-us/articles/18245938714395"
                isExternal={true}
              >
                FAQ
              </Link>
              .
            </Trans>
          </Text>
        </Box>
        <Box maxWidth="400px" width="100%" marginTop="auto">
          <InputGroup background="white" borderRadius="full">
            <InputLeftElement pointerEvents="none">
              <Icon icon="search" width="20px" />
            </InputLeftElement>
            <Input
              type="search"
              borderRadius="full"
              placeholder={t`Search snaps...`}
              value={query}
              onChange={handleChange}
            />
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
        gatsbyPath(filePath: "/snap/{Snap.slug}")
      }
    }

    fusejs {
      index
      data
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
