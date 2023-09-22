import {
  Box,
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
import loadable from '@loadable/component';
import { graphql } from 'gatsby';
import type { ChangeEvent, FunctionComponent } from 'react';
import { useMemo } from 'react';
import { useGatsbyPluginFusejs } from 'react-use-fusejs';
import { useRecoilState } from 'recoil';

import banner from '../assets/images/seo/home.png';
import type { InstalledSnaps, Snap } from '../components';
import { Icon, LoadingGrid, FilterTags, FilterMenu } from '../components';
import { useEthereumProvider, useShuffledSnaps, useFilter } from '../hooks';
import type { FilterState, RegistrySnapCategory } from '../state';
import { queryState } from '../state';
import type { Fields } from '../utils';

const SnapsGrid = loadable(async () => import('../components/SnapsGrid'), {
  fallback: <LoadingGrid />,
});

type IndexPageProps = {
  data: {
    fusejs: Queries.fusejs;
  };
};

type GetSnapsArgs = {
  snaps: Snap[];
  installedSnaps: InstalledSnaps;
  filter: FilterState;
  searchQuery: string;
  searchResults: { item: Queries.Snap }[];
};

/**
 * Get the snaps to display on the index page, based on the selected categories
 * and search query.
 *
 * @param args - The arguments object.
 * @param args.snaps - The snaps to filter.
 * @param args.filter - The filter state.
 * @param args.searchQuery - The search query.
 * @param args.searchResults - The search results.
 * @param args.installedSnaps - The installed snaps.
 * @returns The snaps to display.
 */
function getSnaps({
  snaps,
  filter,
  searchQuery,
  searchResults,
  installedSnaps,
}: GetSnapsArgs) {
  const searchedSnaps =
    searchQuery.length > 0
      ? (searchResults
          .map((searchResult) =>
            snaps.find(({ snapId }) => searchResult.item.snapId === snapId),
          )
          .filter(Boolean) as Snap[])
      : snaps;

  const filteredSnaps = filter.installed
    ? searchedSnaps.filter((snap) => Boolean(installedSnaps[snap.snapId]))
    : searchedSnaps;

  return filteredSnaps.filter((snap) =>
    filter.categories.includes(snap?.category as RegistrySnapCategory),
  );
}

const IndexPage: FunctionComponent<IndexPageProps> = ({ data }) => {
  const [query, setQuery] = useRecoilState(queryState);
  const result = useGatsbyPluginFusejs<Queries.Snap>(query, data.fusejs, {
    threshold: 0.3,
  });
  const { snaps: installedSnaps } = useEthereumProvider();
  const shuffledSnaps = useShuffledSnaps();
  const [filterState] = useFilter();

  const snaps = useMemo(
    () =>
      getSnaps({
        snaps: shuffledSnaps,
        filter: filterState,
        searchQuery: query,
        searchResults: result,
        installedSnaps,
      }),
    [shuffledSnaps, installedSnaps, query, result, filterState],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <Container
      maxWidth="container.xl"
      paddingTop="0"
      marginTop={{ base: 4, md: 20 }}
    >
      <Box maxWidth="500px" width="100%" marginBottom="8">
        <Heading as="h2" fontSize="2xl" marginBottom="1">
          <Trans>Discover Snaps</Trans>
        </Heading>
        <Text>
          <Trans>
            Explore community-built Snaps to customize your web3 experience via
            our official directory.{' '}
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
      <Flex direction="row" marginBottom={{ base: 4, md: 6 }} gap="2">
        <FilterMenu />
        <InputGroup
          background="white"
          borderRadius="full"
          maxWidth={['100%', null, '300px']}
          marginLeft="auto"
          order={[2, null, 1]}
        >
          <InputLeftElement pointerEvents="none">
            <Icon icon="search" width="20px" />
          </InputLeftElement>
          <Input
            type="search"
            borderRadius="full"
            placeholder={t`Search snaps...`}
            value={query}
            onChange={handleChange}
            border="none"
            boxShadow="md"
            _focusVisible={{
              border: 'none',
              outline: 'none',
              boxShadow: 'md',
            }}
          />
        </InputGroup>
      </Flex>
      <FilterTags
        display={['flex', null, 'none']}
        flexWrap="wrap"
        marginBottom="6"
      />
      <Box>
        <SnapsGrid snaps={snaps} />
      </Box>
    </Container>
  );
};

type HeadProps = {
  data: {
    site: {
      siteMetadata: Fields<
        Queries.SiteSiteMetadata,
        'title' | 'description' | 'author' | 'siteUrl'
      >;
    };
  };
};

export const Head: FunctionComponent<HeadProps> = ({ data }) => {
  const image = `${data.site.siteMetadata.siteUrl}${banner}`;

  return (
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
      <meta name="og:image" content={image} />
      <meta name="og:image:width" content="1200" />
      <meta name="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={data.site.siteMetadata.author} />
      <meta name="twitter:title" content={data.site.siteMetadata.title} />
      <meta
        name="twitter:description"
        content={data.site.siteMetadata.description}
      />
      <meta name="twitter:image" content={image} />
    </>
  );
};

export const query = graphql`
  query {
    fusejs {
      index
      data
    }

    site {
      siteMetadata {
        title
        description
        author
        siteUrl
      }
    }
  }
`;

export default IndexPage;
