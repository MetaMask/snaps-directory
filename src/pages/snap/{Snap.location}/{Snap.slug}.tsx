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

import type { RegistrySnapCategory } from '../../../components';
import {
  SnapAuthorship,
  Icon,
  SnapData,
  InstallSnapButton,
  SnapSourceCode,
  SnapAudits,
  SnapCategory,
  BackButton,
  SnapDescription,
} from '../../../components';
import { ExternalLink } from '../../../components/ExternalLink';
import { getLinkText, type Fields } from '../../../utils';

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
  const { name, snapId, icon, website, description, latestVersion } = data.snap;

  return (
    <Container
      maxWidth="container.xl"
      paddingTop="0"
      marginTop={{ base: 4, md: 20 }}
    >
      <BackButton />
      <Box p="6" rounded="3xl" boxShadow="lg" background="white">
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
                leftIcon={<Icon icon="externalLink" width="24px" />}
                width={{ base: '100%', md: 'auto' }}
                marginBottom={{ base: 2, md: 0 }}
                marginRight={{ base: 0, md: 4 }}
                _hover={{ opacity: '75%' }}
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
              website={website}
              version={latestVersion}
            />
          </Flex>
        </Flex>
        <Divider my="6" />
        <Flex
          justifyContent={{ base: 'center', md: 'space-between' }}
          flexDirection={{ base: 'column', md: 'row' }}
          flexWrap={{ base: 'nowrap', md: 'wrap', lg: 'nowrap' }}
          rowGap={{ base: 4, lg: 0 }}
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
                <ExternalLink href={data.snap.author.website}>
                  {data.snap.author.name}
                </ExternalLink>
              }
            />
          )}
          {
            // An empty Box taking full width will divide elements in two rows
            // only on medium size screens while keeping the full flex
            // system for every screen.
          }
          <Box
            display={{ base: 'none', md: 'flex', lg: 'none' }}
            flexBasis="100%"
            height={0}
          />
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
          {(data.snap.support?.contact ||
            data.snap.support?.faq ||
            data.snap.support?.knowledgeBase) && (
            <SnapData
              label={t`Support`}
              value={
                <>
                  {data.snap.support.contact && (
                    <ExternalLink href={data.snap.support.contact}>
                      {getLinkText(data.snap.support.contact, t`Contact`)}
                    </ExternalLink>
                  )}
                  {data.snap.support.faq && (
                    <ExternalLink href={data.snap.support.faq}>
                      <Trans>FAQ</Trans>
                    </ExternalLink>
                  )}
                  {data.snap.support.knowledgeBase && (
                    <ExternalLink href={data.snap.support.knowledgeBase}>
                      <Trans>Knowledge Base</Trans>
                    </ExternalLink>
                  )}
                </>
              }
            />
          )}
        </Flex>
        <Divider my="6" />
        <Text
          color="gray.muted"
          fontFamily="custom"
          textTransform="uppercase"
          fontWeight="medium"
          fontSize="sm"
        >
          <Trans>
            Description by{' '}
            <Text
              as="span"
              color="black"
              fontFamily="custom"
              textTransform="uppercase"
              fontWeight="medium"
              fontSize="sm"
            >
              {name}
            </Text>
          </Trans>
        </Text>
        <SnapDescription description={description} mt="1" />
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
      description {
        description
        trusted
      }
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
