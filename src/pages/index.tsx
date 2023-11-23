import { Container, Divider, Flex, Heading, Link } from '@chakra-ui/react';
import { defineMessage } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { graphql, Link as GatsbyLink } from 'gatsby';
import type { FunctionComponent } from 'react';

import banner from '../assets/images/seo/home.png';
import { RegistrySnapCategory, SNAP_CATEGORY_LINKS } from '../constants';
import { FilteredSnaps } from '../features';
import type { Fields } from '../utils';

const GROUPS = [
  {
    header: defineMessage`Most Popular`,
    limit: 6,
    link: '/browse',
    linkText: defineMessage`Explore All Snaps`,
  },
  {
    header: SNAP_CATEGORY_LINKS[RegistrySnapCategory.Interoperability].header,
    category: RegistrySnapCategory.Interoperability,
    limit: 6,
    link: SNAP_CATEGORY_LINKS[RegistrySnapCategory.Interoperability].link,
    linkText:
      SNAP_CATEGORY_LINKS[RegistrySnapCategory.Interoperability].linkText,
  },
  {
    header:
      SNAP_CATEGORY_LINKS[RegistrySnapCategory.TransactionInsights].header,
    category: RegistrySnapCategory.TransactionInsights,
    limit: 6,
    link: SNAP_CATEGORY_LINKS[RegistrySnapCategory.TransactionInsights].link,
    linkText:
      SNAP_CATEGORY_LINKS[RegistrySnapCategory.TransactionInsights].linkText,
  },
  {
    header: SNAP_CATEGORY_LINKS[RegistrySnapCategory.Notifications].header,
    category: RegistrySnapCategory.Notifications,
    limit: 6,
    link: SNAP_CATEGORY_LINKS[RegistrySnapCategory.Notifications].link,
    linkText: SNAP_CATEGORY_LINKS[RegistrySnapCategory.Notifications].linkText,
  },
];

const IndexPage: FunctionComponent = () => {
  const i18n = useLingui();

  return (
    <Container
      maxWidth="container.xl"
      paddingTop="0"
      marginTop={{ base: 4, md: 20 }}
      display="flex"
      flexDirection="column"
    >
      {GROUPS.map(({ header, limit, category, link, linkText }) => (
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
          <FilteredSnaps limit={limit} category={category ?? null} />

          <Divider mt="12" mb="8" />
        </>
      ))}
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
