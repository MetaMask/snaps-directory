import {
  Box,
  Container,
  Divider,
  Flex,
  Stack,
  StackDivider,
} from '@chakra-ui/react';
import { graphql } from 'gatsby';
import type { FunctionComponent } from 'react';

import { InstallSnapButton, SnapWebsiteButton } from '../../../components';
import { type RegistrySnapCategory } from '../../../constants';
import {
  useGetInstalledSnapsQuery,
  Authorship,
  RelatedSnaps,
  Metadata,
  NotificationAcknowledger,
  Permissions,
  Description,
} from '../../../features';
import type { Fields } from '../../../utils';

type SnapPageProps = {
  data: {
    snap: Fields<
      Queries.Snap,
      | 'name'
      | 'icon'
      | 'snapId'
      | 'description'
      | 'latestVersion'
      | 'website'
      | 'onboard'
      | 'category'
      | 'author'
      | 'sourceCode'
      | 'audits'
      | 'banner'
      | 'support'
      | 'permissions'
    >;
  };
};

const SnapPage: FunctionComponent<SnapPageProps> = ({ data }) => {
  const {
    name,
    snapId,
    icon,
    website,
    onboard,
    description,
    latestVersion,
    category,
    permissions,
  } = data.snap;

  const { data: installedSnaps } = useGetInstalledSnapsQuery();
  const isInstalled = Boolean(installedSnaps?.[snapId]);

  return (
    <Box position="relative">
      <Box
        pointerEvents="none"
        position="absolute"
        top="-50%"
        width="100%"
        height="75%"
        sx={{
          background: `url("${icon}") no-repeat center center`,
          backgroundSize: 'cover',
          filter: 'blur(96px) saturate(1.2)',
          opacity: '0.25',
        }}
      />
      <Container maxWidth="container.xl" paddingTop="0" marginTop="20">
        <NotificationAcknowledger snapId={snapId} version={latestVersion} />
        <Flex
          flexDirection={['column', null, 'row']}
          justifyContent="space-between"
          alignItems="center"
          gap="6"
        >
          <Authorship name={name} icon={icon} snapId={snapId} />
          <Flex alignItems="center" gap="4" width={['100%', null, 'auto']}>
            {!onboard && (
              <InstallSnapButton
                snapId={snapId}
                name={name}
                icon={icon}
                website={website}
                version={latestVersion}
              />
            )}
            {(isInstalled || onboard) && website && (
              <SnapWebsiteButton snapId={snapId} website={website} />
            )}
          </Flex>
        </Flex>

        <Divider marginY="8" />
        <Metadata snap={data.snap} />
        <Divider marginTop="8" marginBottom="12" />

        <Stack
          direction={['column', null, null, 'row']}
          divider={<StackDivider />}
          marginTop="2"
          marginBottom="12"
          spacing="8"
        >
          <Description name={name} description={description} />
          <Permissions snap={data.snap} permissions={permissions} />
        </Stack>

        {category && (
          <>
            <Divider my="12" />
            <RelatedSnaps
              snapId={snapId}
              category={category as RegistrySnapCategory}
            />
          </>
        )}
      </Container>
    </Box>
  );
};

type HeadProps = SnapPageProps & {
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
  const title = `${data.snap.name} on the MetaMask Snaps Directory`;
  const description = `Customize your web3 experience with ${data.snap.name}.`;
  const image = `${data.site.siteMetadata.siteUrl}${data.snap.banner.publicURL}`;

  return (
    <>
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={data.snap.name} />
      <meta property="og:site_name" content={data.site.siteMetadata.title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="og:image" content={image} />
      <meta name="og:image:width" content="1200" />
      <meta name="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={data.site.siteMetadata.author} />
      <meta name="twitter:title" content={data.snap.name} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
};

export const query = graphql`
  query ($id: String) {
    snap(id: { eq: $id }) {
      name
      snapId
      icon
      description {
        description
        trusted
      }
      latestVersion
      website
      onboard
      category
      author {
        name
        website
      }
      sourceCode
      audits {
        auditor
        report
      }
      banner {
        publicURL
      }
      support {
        contact
        faq
        knowledgeBase
      }
      permissions
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

export default SnapPage;
