import { Button, Heading } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

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
    <Heading
      fontSize="5xl"
      sx={{
        textWrap: 'balance',
      }}
    >
      <Trans>Frequently Asked Questions</Trans>
    </Heading>
    <Button variant="small" marginLeft="auto">
      <Trans>View</Trans>
    </Button>
  </Base>
);
