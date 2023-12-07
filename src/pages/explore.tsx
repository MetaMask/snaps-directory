import { Container, Flex, Divider, Heading, Link } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import { graphql, withPrefix } from 'gatsby';
import type { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import banner from '../assets/images/seo/home.png';
import {
  Filter,
  Snaps,
  resetFilters,
  getAll,
  getSearchQuery,
} from '../features';
import { useSelector } from '../hooks';
import type { Fields } from '../utils';

const ExplorePage: FunctionComponent = () => {
  const dispatch = useDispatch();
  const allSnapsShown = useSelector(getAll);
  const searchQuery = useSelector(getSearchQuery);

  const showResetFilter = !allSnapsShown || searchQuery.length > 0;

  const handleResetFilter = () => {
    dispatch(resetFilters());
  };

  return (
    <Container
      maxWidth="container.xl"
      paddingTop="0"
      marginTop={{ base: 4, md: 20 }}
    >
      <Flex direction="row" marginBottom={{ base: 4, md: 6 }} gap="2">
        <Filter />
      </Flex>

      <Divider my="8" />

      <Flex
        width="100%"
        marginBottom="8"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading as="h2" fontSize="2xl">
          {searchQuery ? (
            <Trans>Results for &quot;{searchQuery}&quot;</Trans>
          ) : (
            <Trans>Explore Snaps</Trans>
          )}
        </Heading>
        {showResetFilter && (
          <Link onClick={handleResetFilter} variant="landing">
            <Trans>See All</Trans>
          </Link>
        )}
      </Flex>

      <Snaps />
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
  const image = `${data.site.siteMetadata.siteUrl}${withPrefix(banner)}`;

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

export default ExplorePage;
