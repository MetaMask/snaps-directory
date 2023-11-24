import { Flex, Text, Box, Button } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import { navigate } from 'gatsby';
import type { FunctionComponent } from 'react';

import { Card, SnapAvatar } from '../../../components';
import type { Fields } from '../../../utils';
import { useGetInstalledSnapsQuery } from '../api';

export const SnapCard: FunctionComponent<
  Fields<Queries.Snap, 'name' | 'summary' | 'snapId' | 'icon' | 'gatsbyPath'>
> = ({ name, summary, snapId, icon, gatsbyPath }) => {
  const { data: installedSnaps } = useGetInstalledSnapsQuery();
  const isInstalled = Boolean(installedSnaps?.[snapId]);

  const handleViewClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    navigate(gatsbyPath);
  };

  return (
    <Card height="unset" background="unset" p="2">
      <Flex
        height="48px"
        flexDirection="row"
        justifyContent="space-between"
        gap="2"
      >
        <Flex alignItems="center" width={{ base: '100%', md: 'auto' }}>
          <SnapAvatar
            size="2.75rem"
            badgeSize="1.25rem"
            snapName={name}
            icon={icon}
            isInstalled={isInstalled}
          />
          <Box ml="2" overflow="hidden">
            <Text fontWeight="medium" isTruncated>
              {name}
            </Text>
            <Text
              color="gray.muted"
              fontWeight="medium"
              fontSize="xs"
              display="-webkit-box"
              overflow="hidden"
              sx={{
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {summary}
            </Text>
          </Box>
        </Flex>
        <Flex alignItems="center" justifyContent="flex-end">
          <Button variant="small" onClick={handleViewClick}>
            <Trans>View</Trans>
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};
