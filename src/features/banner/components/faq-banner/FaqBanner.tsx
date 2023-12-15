import { Button, Heading } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { ExternalLinkIcon } from '../../../../components';
import { Announcement } from '../Announcement';
import { Base } from '../Base';

export const FaqBanner: FunctionComponent = () => (
  <Base
    to="https://support.metamask.io/hc/en-us/articles/18245938714395"
    external={true}
  >
    <Announcement variant="error">
      <Trans>Support</Trans>
    </Announcement>
    <Heading fontSize={['3xl', '4xl', '5xl']}>
      <Trans>Frequently Asked Questions</Trans>
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
