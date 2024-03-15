import {
  Box,
  Container,
  Divider,
  Flex,
  Stack,
  StackDivider,
} from '@chakra-ui/react';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { graphql } from 'gatsby';
import type { FunctionComponent } from 'react';

import { InstallSnapButton, SEO, SnapWebsiteButton } from '../../../components';
import { RegistrySnapCategory } from '../../../constants';
import {
  useGetInstalledSnapsQuery,
  Authorship,
  RelatedSnaps,
  Metadata,
  NotificationAcknowledger,
  Permissions,
  Description,
  Screenshots,
} from '../../../features';
import type { Fields } from '../../../utils';

type SnapPageProps = {
  pageContext: {
    locale: string;
  };
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
      | 'additionalSourceCode'
      | 'audits'
      | 'banner'
      | 'support'
      | 'permissions'
      | 'privateCode'
      | 'privacyPolicy'
      | 'termsOfUse'
    >;
  };
};

const Head: FunctionComponent<SnapPageProps> = ({ data, pageContext }) => {
  const { _ } = useLingui();

  const title = _(t`${data.snap.name} on the MetaMask Snaps Directory`);
  const ogTitle = data.snap.name;
  const metaDescription = _(
    t`Customize your web3 experience with ${data.snap.name}.`,
  );

  return (
    <SEO
      locale={pageContext.locale}
      title={title}
      ogTitle={ogTitle}
      description={metaDescription}
      banner={data.snap.banner.publicURL}
    />
  );
};

const SnapPage: FunctionComponent<SnapPageProps> = ({ data, pageContext }) => {
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
      <Head data={data} pageContext={pageContext} />
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

        <Box marginBottom="12" overflowX="auto">
          <Screenshots />
        </Box>

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

        {/* TODO: Enable account management category when there are more Snaps
            in the registry. */}
        {category && category !== RegistrySnapCategory.AccountManagement && (
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
      additionalSourceCode {
        name
        url
      }
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
        keyRecovery
      }
      permissions
      privateCode
      privacyPolicy
      termsOfUse
    }
  }
`;

export default SnapPage;
