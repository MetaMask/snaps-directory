import { Button, Heading } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { ExternalLinkIcon } from '../../../../components';
import { Announcement } from '../Announcement';
import { Base } from '../Base';

export const CreateSnapBanner: FunctionComponent = () => (
  <Base
    to="https://docs.metamask.io/snaps/how-to/develop-a-snap/"
    external={true}
  >
    <Announcement variant="default" live={false}>
      <Trans>Developers</Trans>
    </Announcement>
    <Heading zIndex="1" fontSize={['3xl', '4xl', '5xl']}>
      <Trans>Create your own Snap</Trans>
    </Heading>
    <Button
      variant="small"
      marginLeft="auto"
      zIndex="1"
      rightIcon={<ExternalLinkIcon width="1rem" fill="text.alternative" />}
    >
      <Trans>Documentation</Trans>
    </Button>
  </Base>
);
