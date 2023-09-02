import { Box, Button, Container, Divider, Flex, Text } from '@chakra-ui/react';
import { t, Trans } from '@lingui/macro';
import { graphql } from 'gatsby';
import type { FunctionComponent } from 'react';

import {
  SnapAuthorship,
  Icon,
  SnapData,
  InstallSnapButton,
} from '../../components';
import type { Fields } from '../../utils';

type SnapPageProps = {
  data: {
    snap: Fields<
      Queries.Snap,
      'name' | 'svgIcon' | 'snapId' | 'description' | 'latestVersion'
    >;
  };
};

const SnapPage: FunctionComponent<SnapPageProps> = ({ data }) => {
  const { name, snapId, svgIcon, description, latestVersion } = data.snap;

  return (
    <Container maxWidth="container.lg">
      <Box p="6" rounded="2xl" boxShadow="base" background="white">
        <Flex justifyContent="space-between">
          <SnapAuthorship name={name} svgIcon={svgIcon} snapId={snapId} />
          <Flex alignItems="center">
            <Button
              variant="outline"
              leftIcon={<Icon icon="externalLink" />}
              mr="4"
            >
              <Trans>Website</Trans>
            </Button>
            <InstallSnapButton
              snapId={snapId}
              name={name}
              version={latestVersion}
            />
          </Flex>
        </Flex>
        <Divider my="6" />
        <Flex justifyContent="space-between">
          <SnapData label={t`Developer`} value="Foo" />
          <SnapData label={t`Category`} value="Foo" />
          <SnapData label={t`Source Code`} value="Foo" />
          <SnapData label={t`Version`} value={latestVersion} />
          <SnapData label={t`Audit`} value="Foo" />
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
