import { Container, Flex, Divider } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import type { FunctionComponent } from 'react';

import banner from '../assets/images/seo/home.png';
import { FilterTags, Filter, Snaps } from '../features';
import type { Fields } from '../utils';

const IndexPage: FunctionComponent = () => (
  <Container
    maxWidth="container.xl"
    paddingTop="0"
    marginTop={{ base: 4, md: 20 }}
  >
    <Flex direction="row" marginBottom={{ base: 4, md: 6 }} gap="2">
      <Filter />
    </Flex>
    <FilterTags
      display={['flex', null, 'none']}
      flexWrap="wrap"
      marginBottom="6"
    />

    <Divider my="8" />

    <Snaps />
  </Container>
);

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
