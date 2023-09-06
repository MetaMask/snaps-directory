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
  Stack,
} from '@chakra-ui/react';
import { t, Trans } from '@lingui/macro';
import { graphql } from 'gatsby';
import shuffle from 'lodash/shuffle';
import type { ChangeEvent, FunctionComponent } from 'react';
import { useMemo, useState } from 'react';
import { useGatsbyPluginFusejs } from 'react-use-fusejs';

import {
  Icon,
  SnapCard,
  FilterMenu,
  RegistrySnapCategory,
  SNAP_CATEGORY_LABELS,
} from '../components';
import { useInstalledSnaps } from '../hooks';
import type { Fields } from '../utils';

type IndexSnap = Fields<
  Queries.Snap,
  | 'id'
  | 'snapId'
  | 'name'
  | 'description'
  | 'svgIcon'
  | 'category'
  | 'gatsbyPath'
>;

type IndexPageProps = {
  data: {
    allSnap: {
      nodes: IndexSnap[];
    };
    fusejs: Queries.fusejs;
  };
};

type GetSnapsArgs = {
  snaps: IndexSnap[];
  cachedSnaps: Record<string, { version: string }>;
  categories: RegistrySnapCategory[];
  searchQuery: string;
  searchResults: { item: Queries.Snap }[];
};

/**
 * Get the snaps to display on the index page, based on the selected categories
 * and search query.
 *
 * @param args - The arguments object.
 * @param args.snaps - The snaps to filter.
 * @param args.cachedSnaps - The cached snaps.
 * @param args.categories - The selected categories.
 * @param args.searchQuery - The search query.
 * @param args.searchResults - The search results.
 * @returns The snaps to display.
 */
function getSnaps({
  snaps,
  cachedSnaps,
  categories,
  searchQuery,
  searchResults,
}: GetSnapsArgs) {
  const sortedSnaps = snaps.sort((a, b) => {
    const isSnapAInstalled = Boolean(cachedSnaps[a.snapId]);
    const isSnapBInstalled = Boolean(cachedSnaps[b.snapId]);

    return Number(isSnapBInstalled) - Number(isSnapAInstalled);
  });

  const searchedSnaps =
    searchQuery.length > 0
      ? (searchResults
          .map((searchResult) =>
            sortedSnaps.find(
              ({ snapId }) => searchResult.item.snapId === snapId,
            ),
          )
          .filter(Boolean) as IndexSnap[])
      : sortedSnaps;

  // If all or no categories are selected, return all snaps.
  if (
    categories.length === 0 ||
    categories.length === Object.keys(RegistrySnapCategory).length
  ) {
    return searchedSnaps;
  }

  return searchedSnaps.filter((snap) =>
    categories.includes(snap?.category as RegistrySnapCategory),
  );
}

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
  const [selectedCategories, setSelectedCategories] = useState<
    RegistrySnapCategory[]
  >(Object.keys(SNAP_CATEGORY_LABELS) as RegistrySnapCategory[]);

  const snaps = useMemo(
    () =>
      getSnaps({
        snaps: shuffledSnaps,
        cachedSnaps: cachedInstalledSnaps,
        categories: selectedCategories,
        searchQuery: query,
        searchResults: result,
      }),
    [shuffledSnaps, cachedInstalledSnaps, selectedCategories, query, result],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleToggle = (category: RegistrySnapCategory) => {
    if (selectedCategories.includes(category)) {
      return setSelectedCategories(
        selectedCategories.filter((item) => item !== category),
      );
    }

    return setSelectedCategories([...selectedCategories, category]);
  };

  return (
    <Container maxWidth="container.xl">
      <Flex
        direction={['column', null, 'row']}
        justifyContent="space-between"
        marginBottom="6"
        gap="4"
      >
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
        <Stack
          direction="row"
          maxWidth={['100%', null, '400px']}
          width="100%"
          marginTop="auto"
        >
          <FilterMenu
            selectedCategories={selectedCategories}
            onToggle={handleToggle}
          />
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
        </Stack>
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
        category
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
