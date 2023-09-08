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
      | 'support'
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
                <>
                  <ExternalLink href={data.snap.author.website as string}>
                    {data.snap.author.name}
                  </ExternalLink>
                  {data.snap.support.contact && (
                    <ExternalLink href={data.snap.support.contact}>
                      <Trans>Contact</Trans>
                    </ExternalLink>
                  )}
                  {data.snap.support.faq && (
                    <ExternalLink href={data.snap.support.faq}>
                      <Trans>FAQ</Trans>
                    </ExternalLink>
                  )}
                  {(data.snap.support as any).knowledgeBase && (
                    <ExternalLink
                      href={(data.snap.support as any).knowledgeBase}
                    >
                      <Trans>Knowledge Base</Trans>
                    </ExternalLink>
                  )}
                </>
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

export const Head: FunctionComponent<HeadProps> = ({ data }) => {
  const title = `${data.snap.name} - ${data.site.siteMetadata.title}`;
  const description = `Discover and install ${data.snap.name} on the MetaMask Snaps Directory to enhance your web3 experience. Easily find and install useful Snaps to customize your MetaMask wallet.`;
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
      <meta name="twitter:title" content={title} />
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
      support {
        contact
        faq
        knowledgeBase
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
