import {
  Box,
  Container,
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorModeValue,
} from '@chakra-ui/react';
import type { PageProps } from 'gatsby';
import { graphql } from 'gatsby';

import AccountDetailCard from '../../features/snaps/components/AccountDetailCard';
import type { Fields } from '../../utils';

const AccountPage = ({ params }: PageProps) => {
  const bg = useColorModeValue('gray.200', 'gray.700');

  return (
    <Container maxWidth="container.xl" paddingTop="0">
      <Box
        bgImage="url('https://example.com/background.jpg')"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        height="50vh"
        bg={bg}
      ></Box>

      <Box w="100%" mt={'-70'}>
        <AccountDetailCard address={params.address} />
      </Box>
      <Box mt={10} w="100%">
        <Divider colorScheme="facebook" size="14" />
      </Box>

      <Box mt={10} w="100%">
        <Tabs align="center" size="lg" variant="line" colorScheme="facebook">
          <TabList>
            <Tab m={5} fontSize={14}>
              Developed Snaps
            </Tab>
            <Tab m={5} fontSize={14}>
              Security Reports
            </Tab>
            <Tab m={5} fontSize={14}>
              Reviews
            </Tab>
            <Tab m={5} fontSize={14}>
              Trusted Circle
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>Developed Snaps!</p>
            </TabPanel>
            <TabPanel>
              <p>Security Reports!</p>
            </TabPanel>
            <TabPanel>
              <p>Reviews!</p>
            </TabPanel>
            <TabPanel>
              <p>Trusted Circle!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
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
