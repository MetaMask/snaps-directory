import { Button, Heading } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { MetaMaskIcon } from '../../../../components';
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
    <Heading
      zIndex="1"
      fontSize="5xl"
      sx={{
        textWrap: 'balance',
      }}
    >
      <Trans>Create your own Snap</Trans>
    </Heading>
    <Button variant="small" marginLeft="auto" zIndex="1">
      <Trans>View</Trans>
    </Button>
    <MetaMaskIcon position="absolute" width="12rem" bottom="-3rem" zIndex="0" />
  </Base>
);
