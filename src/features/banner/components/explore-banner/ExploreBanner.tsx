import { Box, Button, Heading, Stack } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { SnapsRow } from './SnapsRow';
import type { Fields } from '../../../../utils';
import { Announcement } from '../Announcement';
import { Base } from '../Base';

export type ExploreBannerProps = {
  snaps: Fields<Queries.Snap, 'snapId' | 'icon'>[];
};

export const ExploreBanner: FunctionComponent<ExploreBannerProps> = ({
  snaps,
}) => (
  <Base to="/explore">
    <Announcement>
      <Trans>Open Beta Live</Trans>
    </Announcement>
    <Heading
      fontSize="5xl"
      zIndex="1"
      sx={{
        textWrap: 'balance',
      }}
    >
      Explore, install, and use community-built features in MetaMask
    </Heading>
    <Button variant="small" marginLeft="auto" zIndex="1">
      <Trans>View</Trans>
    </Button>

    <Box
      position="absolute"
      width="calc(100% + 10rem)"
      bottom="-6rem"
      left="-5rem"
      right="5rem"
      overflow="hidden"
      zIndex="0"
      pointerEvents="none"
      sx={{
        perspective: '62.5rem',
        perspectiveOrigin: '50% 50%',
      }}
    >
      <Stack gap="4" transform="rotateX(67.5deg)">
        <SnapsRow snaps={snaps} />
        <SnapsRow snaps={snaps} />
        <SnapsRow snaps={snaps} />
      </Stack>
      <Box
        position="absolute"
        top="0"
        width="100%"
        height="100%"
        bgGradient="linear(180deg, background.default-hover 0%, background.default-hover 25%, background.default-hover-muted 150%)"
      />
    </Box>
  </Base>
);
