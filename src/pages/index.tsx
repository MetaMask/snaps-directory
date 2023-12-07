import { Container, Divider, Flex, Heading, Link } from '@chakra-ui/react';
import { defineMessage } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { graphql, Link as GatsbyLink, withPrefix } from 'gatsby';
import { useEffect, type FunctionComponent } from 'react';

import banner from '../assets/images/seo/home.png';
import { Banner } from '../components';
import { RegistrySnapCategory, SNAP_CATEGORY_LINKS } from '../constants';
import { FilteredSnaps, resetFilters } from '../features';
import { Order } from '../features/filter/constants';
import { useDispatch } from '../hooks';
import type { Fields } from '../utils';

const GROUPS = [
  {
    header: defineMessage`Most Popular`,
    limit: 6,
    link: '/explore',
    linkText: defineMessage`Explore All Snaps`,
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
    header:
      SNAP_CATEGORY_LINKS[RegistrySnapCategory.TransactionInsights].header,
    category: RegistrySnapCategory.TransactionInsights,
    limit: 6,
    link: SNAP_CATEGORY_LINKS[RegistrySnapCategory.TransactionInsights].link,
    linkText:
      SNAP_CATEGORY_LINKS[RegistrySnapCategory.TransactionInsights].linkText,
    order: Order.DeterministicRandom,
  },
  {
    header: SNAP_CATEGORY_LINKS[RegistrySnapCategory.Notifications].header,
    category: RegistrySnapCategory.Notifications,
    limit: 3,
    link: SNAP_CATEGORY_LINKS[RegistrySnapCategory.Notifications].link,
    linkText: SNAP_CATEGORY_LINKS[RegistrySnapCategory.Notifications].linkText,
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

const IndexPage: FunctionComponent = () => {
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
      <Banner />
      <Divider my="8" />

      {GROUPS.map(
        ({ header, limit, category, link, linkText, order }, index) => (
          <>
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
              <Link as={GatsbyLink} to={link} variant="landing">
                {i18n._(linkText)}
              </Link>
            </Flex>
            <FilteredSnaps limit={limit} category={category} order={order} />

            {index !== GROUPS.length - 1 && <Divider mt="12" mb="8" />}
          </>
        ),
      )}
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

export default IndexPage;
