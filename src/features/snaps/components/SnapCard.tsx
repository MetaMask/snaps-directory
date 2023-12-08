import { Flex, Text, Box, Button } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import { Link } from 'gatsby';
import type { FunctionComponent } from 'react';

import { SnapCardImage } from './SnapCardImage';
import { Card, SnapAvatar } from '../../../components';
import type { Fields } from '../../../utils';
import { useGetInstalledSnapsQuery } from '../api';

export type SnapCardProps = Fields<
  Queries.Snap,
  'name' | 'summary' | 'snapId' | 'icon' | 'gatsbyPath'
> & {
  image?: boolean | undefined;
  onClick?: () => void;
};

export const SnapCard: FunctionComponent<SnapCardProps> = ({
  name,
  summary,
  snapId,
  icon,
  gatsbyPath,
  image,
  onClick = () => undefined,
}) => {
  const { data: installedSnaps } = useGetInstalledSnapsQuery();
  const isInstalled = Boolean(installedSnaps?.[snapId]);

  return (
    <Link to={gatsbyPath} onClick={onClick}>
      <Card
        padding="2"
        _hover={{
          background: 'background.default-hover',
          '& button': {
            background: 'info.default',
            color: 'white',
          },
          '& .card-image': {
            filter: 'blur(60px) contrast(0.9) saturate(1.3)',
            transform: 'scale(1.3)',
          },
        }}
      >
        {image && <SnapCardImage name={name} icon={icon} />}
        <Flex
          height="3rem"
          flexDirection="row"
          justifyContent="space-between"
          gap="2"
        >
          <Flex
            alignItems="center"
            width={{ base: '100%', md: 'auto' }}
            height="fit-content"
            gap="2"
            overflow="hidden"
          >
            <SnapAvatar
              size="2.75rem"
              badgeSize="1.25rem"
              snapName={name}
              icon={icon}
              isInstalled={isInstalled}
            />
            <Box overflow="hidden">
              <Text fontWeight="medium" isTruncated={true}>
                {name}
              </Text>
              <Text color="text.alternative" fontSize="xs" isTruncated={true}>
                {summary}
              </Text>
            </Box>
          </Flex>
          <Flex alignItems="center" justifyContent="flex-end">
            <Button variant="small">
              <Trans>View</Trans>
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Link>
  );
};
