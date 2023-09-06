import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Link,
  Text,
} from '@chakra-ui/react';
import { t, Trans } from '@lingui/macro';
import { graphql } from 'gatsby';
import type { FunctionComponent } from 'react';

import type { RegistrySnapCategory } from '../../components';
import {
  SnapAuthorship,
  Icon,
  SnapData,
  InstallSnapButton,
  SnapSourceCode,
  SnapAudits,
  SnapCategory,
  BackButton,
} from '../../components';
import { ExternalLink } from '../../components/ExternalLink';
import type { Fields } from '../../utils';

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
      | 'category'
      | 'author'
      | 'sourceCode'
      | 'audits'
      | 'banner'
    >;
  };
};

const SnapPage: FunctionComponent<SnapPageProps> = ({ data }) => {
  const { name, snapId, icon, description, latestVersion } = data.snap;

  return (
    <Container
      maxWidth="container.xl"
      paddingTop="0"
      marginTop={{ base: 4, md: 20 }}
    >
      <BackButton />
      <Box p="6" rounded="2xl" boxShadow="base" background="white">
        <Flex
          justifyContent="space-between"
          flexDirection={{ base: 'column', md: 'row' }}
          alignItems="center"
        >
          <SnapAuthorship name={name} icon={icon} snapId={snapId} />
          <Flex
            alignItems="center"
            flexDirection={{ base: 'column', md: 'row' }}
            marginTop={{ base: 4, md: 0 }}
            width={{ base: '100%', md: 'auto' }}
          >
            {data.snap.website && (
              <Button
                variant="outline"
                leftIcon={<Icon icon="externalLink" />}
                width={{ base: '100%', md: 'auto' }}
                marginBottom={{ base: 2, md: 0 }}
                marginRight={{ base: 0, md: 4 }}
              >
                <Link
                  href={data.snap.website}
                  isExternal={true}
                  _hover={{ textDecoration: 'none' }}
                >
                  <Trans>Website</Trans>
                </Link>
              </Button>
            )}
            <InstallSnapButton
              snapId={snapId}
              name={name}
              icon={icon}
              version={latestVersion}
            />
          </Flex>
        </Flex>
        <Divider my="6" />
        <Flex
          justifyContent={{ base: 'center', md: 'space-between' }}
          flexDirection={{ base: 'column', md: 'row' }}
          rowGap={{ base: 4, md: 0 }}
        >
          {data.snap.category && (
            <SnapData
              label={t`Category`}
              value={
                <SnapCategory
                  category={data.snap.category as RegistrySnapCategory}
                />
              }
            />
          )}
          <SnapData label={t`Version`} value={latestVersion} />
          {data.snap.author && (
            <SnapData
              label={t`Developer`}
              value={
                <ExternalLink href={data.snap.author.website as string}>
                  {data.snap.author.name}
                </ExternalLink>
              }
            />
          )}
          {data.snap.sourceCode && (
            <SnapData
              label={t`Source Code`}
              value={<SnapSourceCode url={data.snap.sourceCode} />}
            />
          )}
          {data.snap.audits && (
            <SnapData
              label={t`Audit`}
              value={
                <SnapAudits
                  audits={
                    data.snap.audits as Fields<
                      Queries.SnapAudits,
                      'auditor' | 'report'
                    >[]
                  }
                />
              }
            />
          )}
        </Flex>
        <Divider my="6" />
        <Text color="gray.muted" fontFamily="custom" textTransform="uppercase">
          <Trans>
            Description by{' '}
            <Text
              as="span"
              color="black"
              fontFamily="custom"
              textTransform="uppercase"
            >
              {name}
            </Text>
          </Trans>
        </Text>
        <Text mt="1">{description}</Text>
      </Box>
    </Container>
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

export const Head: FunctionComponent<HeadProps> = ({ data }) => (
  <>
    <html lang="en" />
    <title>
      {data.snap.name} - {data.site.siteMetadata.title}
    </title>
    <meta name="description" content={data.site.siteMetadata.description} />
    <meta property="og:title" content={data.snap.name} />
    <meta property="og:site_name" content="MetaMask Snaps Directory" />
    <meta
      property="og:description"
      content={data.site.siteMetadata.description}
    />
    <meta property="og:type" content="website" />
    <meta
      name="og:image"
      content={`${data.site.siteMetadata.siteUrl}${data.snap.banner.publicURL}`}
    />
    <meta name="og:image:width" content="1200" />
    <meta name="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:creator" content={data.site.siteMetadata.author} />
    <meta name="twitter:title" content={data.site.siteMetadata.title} />
    <meta
      name="twitter:description"
      content={data.site.siteMetadata.description}
    />
    <meta
      name="twitter:image"
      content={`${data.site.siteMetadata.siteUrl}${data.snap.banner.publicURL}`}
    />
  </>
);

export const query = graphql`
  query ($id: String) {
    snap(id: { eq: $id }) {
      name
      snapId
      icon
      description
      latestVersion
      website
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
