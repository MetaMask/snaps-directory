import { Box, Container, Heading, Text, Flex, Link } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
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
    <Box maxWidth="31.25rem" width="100%" marginBottom="8">
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
      <Filter />
    </Flex>
    <FilterTags
      display={['flex', null, 'none']}
      flexWrap="wrap"
      marginBottom="6"
    />
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
