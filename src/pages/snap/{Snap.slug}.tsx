import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Link,
  Text,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react';
import { t, Trans } from '@lingui/macro';
import { graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
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
      | 'svgIcon'
      | 'snapId'
      | 'description'
      | 'latestVersion'
      | 'website'
      | 'category'
      | 'author'
      | 'sourceCode'
      | 'audits'
    >;
  };
};

const SnapPage: FunctionComponent<SnapPageProps> = ({ data }) => {
  const { name, snapId, svgIcon, description, latestVersion } = data.snap;
  const {
    isOpen: isMobileDrawerOpen,
    onOpen: onMobileDrawerOpen,
    onClose: onMobileDrawerClose,
  } = useDisclosure();

  return (
    <Container maxWidth="container.xl">
      <BackButton />
      <Box p="6" rounded="2xl" boxShadow="base" background="white">
        <Flex justifyContent="space-between">
          <SnapAuthorship name={name} svgIcon={svgIcon} snapId={snapId} />
          <Flex alignItems="center">
            {data.snap.website && (
              <Button
                variant="outline"
                leftIcon={<Icon icon="externalLink" />}
                mr="4"
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
            <Box display={{ base: 'block', md: 'none' }}>
              <Button
                onClick={onMobileDrawerOpen}
                leftIcon={<Icon icon="metamask" width="20px" />}
                variant="primary"
                loadingText={`Install ${name}`}
              >
                <Trans>Install {name}</Trans>
              </Button>
            </Box>
            <Box display={{ base: 'none', md: 'block' }}>
              <InstallSnapButton
                snapId={snapId}
                name={name}
                icon={svgIcon}
                version={latestVersion}
              />
            </Box>
          </Flex>
        </Flex>
        <Divider my="6" />
        <Flex justifyContent="space-between">
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
      <>
        <Drawer
          placement="bottom"
          onClose={onMobileDrawerClose}
          isOpen={isMobileDrawerOpen}
          size="lg"
        >
          <DrawerOverlay />
          <DrawerContent borderTopRadius="48px">
            <DrawerBody>
              <Flex
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                paddingTop="16px"
                paddingBottom="24px"
              >
                <StaticImage
                  src="../../assets/images/desktop_only.png"
                  alt={t`Desktop Only`}
                />
                <Text fontSize="2xl" marginTop="16px">
                  <Trans>Desktop only</Trans>
                </Text>
                <Text textAlign="center" marginTop="16px">
                  <Trans>
                    MetaMask Snaps is in open beta and only supported via our
                    extension clients on desktop such as Brave, Chrome, or
                    Firefox.
                  </Trans>
                </Text>
                <Button
                  onClick={onMobileDrawerClose}
                  variant="primary"
                  width="100%"
                  marginTop="16px"
                >
                  <Trans>Got it</Trans>
                </Button>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    </Container>
  );
};

type HeadProps = SnapPageProps & {
  data: {
    site: {
      siteMetadata: Fields<
        Queries.SiteSiteMetadata,
        'title' | 'description' | 'author'
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
    <meta
      property="og:title"
      content={`${data.snap.name} ${data.site.siteMetadata.title}`}
    />
    <meta
      property="og:description"
      content={data.site.siteMetadata.description}
    />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:creator" content={data.site.siteMetadata.author} />
    <meta name="twitter:title" content={data.site.siteMetadata.title} />
    <meta
      name="twitter:description"
      content={data.site.siteMetadata.description}
    />
  </>
);

export const query = graphql`
  query ($id: String) {
    snap(id: { eq: $id }) {
      name
      snapId
      svgIcon
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
    }

    site {
      siteMetadata {
        title
        description
        author
      }
    }
  }
`;

export default SnapPage;
