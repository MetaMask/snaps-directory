import { Box, Container, Divider, VStack } from '@chakra-ui/react';
import type { PageProps } from 'gatsby';
import { graphql } from 'gatsby';

import AccountDetailCard from '../../features/snaps/components/AccountProfile/AccountDetailCard';
import AccountProfileTabs from '../../features/snaps/components/AccountProfile/AccountProfileTabs';
import type { Fields } from '../../utils';

const AccountPage = ({ params }: PageProps) => {
  return (
    <Container maxWidth="container.xl" paddingTop="0">
      <Box
        as="section"
        id="heading"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        height="250"
        bg={
          'linear-gradient(93deg, rgba(221, 221, 221, 0.50) 0%, rgba(242, 242, 242, 0.50) 26.04%, rgba(220, 220, 220, 0.50) 55.79%, rgba(175, 175, 175, 0.50) 100%);'
        }
      ></Box>
      <VStack mt={-75} spacing={'48px'}>
        <AccountDetailCard address={params.address ?? '0x0'} />

        <Divider h="1px" bg={'#D6D9DC'} />

        <AccountProfileTabs />
      </VStack>
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

export const Head = ({ data }: HeadProps) => {
  return (
    <>
      <html lang="en" />
      <title>{data.site.siteMetadata.title}</title>
      <meta name="description" content={data.site.siteMetadata.description} />
      <meta property="og:site_name" content={data.site.siteMetadata.title} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={data.site.siteMetadata.author} />
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

export default AccountPage;
