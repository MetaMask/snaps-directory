import { Button, Heading } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import banner from '../../../../assets/images/support-banner.svg?raw';
import { ExternalLinkIcon } from '../../../../components';
import { Announcement } from '../Announcement';
import { Base } from '../Base';

export const FaqBanner: FunctionComponent = () => (
  <Base
    to="https://support.metamask.io/hc/en-us/articles/18245938714395"
    external={true}
    // Based on `error.muted`, but without opacity.
    background="#efd7d7"
    backgroundImage={`url('${banner}')`}
  >
    <Announcement variant="error">
      <Trans>Support</Trans>
    </Announcement>
    <Heading color="error.default" fontSize={['3xl', '4xl', '5xl']}>
      <Trans>Frequently asked questions</Trans>
    </Heading>
    <Button
      variant="small"
      marginLeft="auto"
      rightIcon={<ExternalLinkIcon width="1rem" fill="text.alternative" />}
    >
      <Trans>Open</Trans>
    </Button>
  </Base>
);
