import { Button, Heading } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import banner from '../../../../assets/images/create-your-snap-banner.svg?raw';
import { ExternalLinkIcon } from '../../../../components';
import { Announcement } from '../Announcement';
import { Base } from '../Base';

export const CreateSnapBanner: FunctionComponent = () => (
  <Base
    to="https://docs.metamask.io/snaps/"
    external={true}
    // Based on `success.muted`, but without opacity.
    background="#E8F2EA"
    backgroundImage={`url('${banner}')`}
  >
    <Announcement variant="success" live={false}>
      <Trans>Developers</Trans>
    </Announcement>
    <Heading
      zIndex="1"
      color="success.default"
      fontSize={['3xl', '4xl', '5xl']}
    >
      <Trans>Build your own Snap</Trans>
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
