import { Box, Container, Divider, Flex, Text } from '@chakra-ui/react';
import { t, Trans } from '@lingui/macro';
import { graphql } from 'gatsby';
import type { FunctionComponent } from 'react';

import {
  SnapAuthorship,
  SnapData,
  InstallSnapButton,
  SnapSourceCode,
  SnapAudits,
  SnapCategory,
  BackButton,
  SnapDescription,
  SnapWebsiteButton,
} from '../../../components';
import { ExternalLink } from '../../../components/ExternalLink';
import type { RegistrySnapCategory } from '../../../constants';
import { NotificationAcknowledger } from '../../../features/notifications/components';
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
      | 'onboard'
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
  const { name, snapId, icon, website, onboard, description, latestVersion } =
    data.snap;

  return (
    <Container
      maxWidth="container.xl"
      paddingTop="0"
      marginTop={{ base: 4, md: 20 }}
    >
      <NotificationAcknowledger snapId={snapId} version={latestVersion} />
      <BackButton />
      <Box p="6" rounded="3xl" boxShadow="lg" background="background.card">
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
            gap={{ base: 4, md: 4 }}
          >
            {website && (
              <SnapWebsiteButton
                snapId={snapId}
                website={website}
                onboard={onboard}
              />
            )}
            {!onboard && (
              <InstallSnapButton
                snapId={snapId}
                name={name}
                icon={icon}
                website={website}
                version={latestVersion}
              />
            )}
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
              order={{ base: 1, md: 1 }}
              label={t`Category`}
              value={
                <SnapCategory
                  category={data.snap.category as RegistrySnapCategory}
                />
              }
            />
          )}
          <SnapData
            order={{ base: 8, md: 2 }}
            label={t`Version`}
            value={latestVersion}
          />
          {data.snap.author && (
            <SnapData
              order={{ base: 2, md: 3 }}
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
            order={{ base: 1, md: 4 }}
            display={{ base: 'none', md: 'flex', lg: 'none' }}
            flexBasis="100%"
            height={0}
          />
          {
            // On mobile screens description is displayed in the middle
            // of the Snap's metadata
          }
          <Divider
            my="2"
            display={{ base: 'flex', md: 'none' }}
            order={{ base: 4, md: 5 }}
          />
          <Text
            display={{ base: 'block', md: 'none' }}
            order={{ base: 5, md: 6 }}
            color="gray.muted"
            textTransform="uppercase"
            fontWeight="medium"
            fontSize="sm"
          >
            <Trans>
              Description by{' '}
              <Text
                as="span"
                color="text.muted"
                textTransform="uppercase"
                fontWeight="medium"
                fontSize="sm"
              >
                {name}
              </Text>
            </Trans>
          </Text>
          <SnapDescription
            order={{ base: 6, md: 7 }}
            description={description}
            mt="1"
            whiteSpace="pre-wrap"
            display={{ base: 'block', md: 'none' }}
          />
          <Divider
            my="2"
            display={{ base: 'flex', md: 'none' }}
            order={{ base: 7, md: 8 }}
          />
          {data.snap.sourceCode && (
            <SnapData
              order={{ base: 9, md: 9 }}
              label={t`Source Code`}
              value={<SnapSourceCode url={data.snap.sourceCode} />}
            />
          )}
          {data.snap.audits && (
            <SnapData
              order={{ base: 10, md: 10 }}
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
              order={{ base: 3, md: 11 }}
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
        <Divider my="6" display={{ base: 'none', md: 'flex' }} />
        <Text
          display={{ base: 'none', md: 'block' }}
          color="gray.muted"
          textTransform="uppercase"
          fontWeight="medium"
          fontSize="sm"
        >
          <Trans>
            Description by{' '}
            <Text
              as="span"
              color="text.muted"
              textTransform="uppercase"
              fontWeight="medium"
              fontSize="sm"
            >
              {name}
            </Text>
          </Trans>
        </Text>
        <SnapDescription
          display={{ base: 'none', md: 'block' }}
          description={description}
          mt="1"
          whiteSpace="pre-wrap"
        />
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
