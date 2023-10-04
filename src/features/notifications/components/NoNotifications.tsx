import { Center, Heading, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { Fox } from '../../../components';

export const NoNotifications: FunctionComponent = () => (
  <Center
    flexDirection="column"
    gap="1"
    maxWidth="18.75rem"
    marginX="16"
    marginY="4.813rem"
  >
    <Fox width={135} />
    <Heading
      as="h3"
      fontSize="lg"
      fontWeight="500"
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
