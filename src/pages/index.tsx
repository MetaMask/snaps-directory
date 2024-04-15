import { Container, Divider, Flex, Heading, Link } from '@chakra-ui/react';
import { defineMessage } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { graphql, Link as GatsbyLink } from 'gatsby';
import { useEffect, type FunctionComponent, Fragment } from 'react';

import { SEO } from '../components';
import { RegistrySnapCategory, SNAP_CATEGORY_LINKS } from '../constants';
import { Banner, FilteredSnaps, resetFilters } from '../features';
import { Order } from '../features/filter/constants';
import { useDispatch } from '../hooks';
import type { Fields } from '../utils';

const GROUPS = [
  {
    header: defineMessage`Most Popular`,
    limit: 3,
    link: '/explore',
    linkText: defineMessage`Explore All Snaps`,
    images: true,
  },
  {
    header: SNAP_CATEGORY_LINKS[RegistrySnapCategory.AccountManagement].header,
    category: RegistrySnapCategory.AccountManagement,
    limit: 3,
    link: SNAP_CATEGORY_LINKS[RegistrySnapCategory.AccountManagement].link,
    linkText:
      SNAP_CATEGORY_LINKS[RegistrySnapCategory.AccountManagement].linkText,
    order: Order.DeterministicRandom,
  },
  {
    header: SNAP_CATEGORY_LINKS[RegistrySnapCategory.Interoperability].header,
    category: RegistrySnapCategory.Interoperability,
    limit: 6,
    link: SNAP_CATEGORY_LINKS[RegistrySnapCategory.Interoperability].link,
    linkText:
      SNAP_CATEGORY_LINKS[RegistrySnapCategory.Interoperability].linkText,
    order: Order.DeterministicRandom,
  },
  {
    header: SNAP_CATEGORY_LINKS[RegistrySnapCategory.Security].header,
    category: RegistrySnapCategory.Security,
    limit: 6,
    link: SNAP_CATEGORY_LINKS[RegistrySnapCategory.Security].link,
    linkText: SNAP_CATEGORY_LINKS[RegistrySnapCategory.Security].linkText,
    order: Order.DeterministicRandom,
  },
  {
    header: SNAP_CATEGORY_LINKS[RegistrySnapCategory.Communication].header,
    category: RegistrySnapCategory.Communication,
    limit: 3,
    link: SNAP_CATEGORY_LINKS[RegistrySnapCategory.Communication].link,
    linkText: SNAP_CATEGORY_LINKS[RegistrySnapCategory.Communication].linkText,
    order: Order.DeterministicRandom,
  },
  {
    header: defineMessage`Latest`,
    limit: 3,
    link: '/latest',
    linkText: defineMessage`See Latest`,
    order: Order.Latest,
  },
];

export type IndexPageProps = {
  pageContext: {
    locale: string;
  };
  data: {
    allSnap: {
      nodes: Fields<Queries.Snap, 'snapId' | 'icon'>[];
    };
  };
};

const Head: FunctionComponent<IndexPageProps> = ({ pageContext }) => {
  return <SEO locale={pageContext.locale} />;
};

const IndexPage: FunctionComponent<IndexPageProps> = ({
  data,
  pageContext,
}) => {
  const i18n = useLingui();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  return (
    <Container
      maxWidth="container.xl"
      paddingTop="0"
      marginTop="4"
      display="flex"
      flexDirection="column"
    >
      <Head data={data} pageContext={pageContext} />
      <Banner snaps={data.allSnap.nodes} />
      <Divider my="8" />

      {GROUPS.map(
        ({ header, limit, category, link, linkText, order, images }, index) => (
          <Fragment key={`group-${index}`}>
            <Flex
              width="100%"
              marginBottom="8"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Heading as="h2" fontSize="2xl">
                {i18n._(header)}
              </Heading>
              <Link as={GatsbyLink} to={link} variant="landing" flexShrink="0">
                {i18n._(linkText)}
              </Link>
            </Flex>
            <FilteredSnaps
              limit={limit}
              category={category}
              order={order}
              images={images}
            />

            {index !== GROUPS.length - 1 && <Divider mt="12" mb="8" />}
          </Fragment>
        ),
      )}
    </Container>
  );
};

export const query = graphql`
  query {
    allSnap {
      nodes {
        snapId
        icon
      }
    }
  }
`;

export default IndexPage;
