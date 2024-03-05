import { Container, Flex, Divider, Heading, Link } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import { withPrefix } from 'gatsby';
import type { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';

import banner from '../assets/images/seo/home.png';
import { SEO } from '../components';
import {
  Filter,
  Snaps,
  resetFilters,
  getAll,
  getSearchQuery,
} from '../features';
import { useSelector } from '../hooks';

export type ExplorePageProps = {
  pageContext: {
    locale: string;
  };
};

const Head: FunctionComponent<ExplorePageProps> = ({ pageContext }) => {
  return <SEO locale={pageContext.locale} banner={withPrefix(banner)} />;
};

const ExplorePage: FunctionComponent<ExplorePageProps> = ({ pageContext }) => {
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
      <Head pageContext={pageContext} />
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

export default ExplorePage;
