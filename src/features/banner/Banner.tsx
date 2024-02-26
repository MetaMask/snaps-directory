import { Box } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import {
  Carousel,
  ExploreBanner,
  CreateSnapBanner,
  FaqBanner,
} from './components';
import type { Fields } from '../../utils';

export type BannerProps = {
  snaps: Fields<Queries.Snap, 'snapId' | 'icon'>[];
};

export const Banner: FunctionComponent<BannerProps> = ({ snaps }) => (
  <Box height="21.875rem">
    <Carousel>
      <ExploreBanner snaps={snaps} key="explore-banner" />
      <CreateSnapBanner key="create-snap-banner" />
      <FaqBanner key="faq-banner" />
    </Carousel>
  </Box>
);
