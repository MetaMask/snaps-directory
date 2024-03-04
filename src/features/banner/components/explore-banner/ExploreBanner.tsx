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
  <Base
    to="/explore"
    _hover={{
      '& .explore-banner-background': {
        perspective: '60rem',
        filter: 'saturate(1.2)',
        transform: 'scale(0.98)',
      },
      '& .explore-banner-background-gradient': {
        opacity: '0.75',
      },
    }}
  >
    <Announcement>
      <Trans>Open Beta Live</Trans>
    </Announcement>
    <Heading
      fontSize={['3xl', '4xl', '5xl']}
      zIndex="1"
      display="block"
      maxWidth="75%"
    >
      <Trans>
        Explore, install, and use community-built features in MetaMask
      </Trans>
    </Heading>
    <Button variant="small" marginLeft="auto" zIndex="1">
      <Trans>Discover</Trans>
    </Button>

    <Box
      className="explore-banner-background"
      position="absolute"
      width="calc(100% + 10rem)"
      bottom="-6rem"
      left="-5rem"
      right="5rem"
      overflow="hidden"
      zIndex="0"
      pointerEvents="none"
      transition="all 0.3s ease"
      sx={{
        perspective: '62.5rem',
        perspectiveOrigin: '50% 50%',
      }}
    >
      <Stack gap="4" transform="rotateX(67.5deg)">
        <SnapsRow snaps={snaps} delay={250} />
        <SnapsRow snaps={snaps} delay={1000} />
        <SnapsRow snaps={snaps} delay={1750} />
      </Stack>
      <Box
        className="explore-banner-background-gradient"
        position="absolute"
        top="0"
        width="100%"
        height="100%"
        transition="all 0.3s ease"
        bgGradient="linear(180deg, background.default-hover 0%, background.default-hover 25%, background.default-hover-muted 150%)"
      />
    </Box>
  </Base>
);
