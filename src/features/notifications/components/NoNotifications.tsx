import { Center, Heading, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { Fox } from '../../../components';

export const NoNotifications: FunctionComponent = () => (
  <Center
    flexDirection="column"
    gap="1"
    maxWidth={['calc(100vw - 2rem)', null, '17.188rem']}
    margin={['auto', '4', '10']}
  >
    <Fox width={200} />
    <Heading
      as="h3"
      fontSize="2xl"
      fontWeight="600"
      color="gray.muted"
      marginTop="3"
    >
      <Trans>No notifications</Trans>
    </Heading>
    <Text color="gray.muted" textAlign="center">
      <Trans>
        Updates for your installed Snaps will be displayed here when available.
      </Trans>
    </Text>
  </Center>
);
