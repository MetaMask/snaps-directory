import type { FlexProps } from '@chakra-ui/react';
import { Box, Flex, Link, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { LocalePicker } from './LocalePicker';

export type FooterCopyrightProps = FlexProps;

export const FooterCopyright: FunctionComponent<FooterCopyrightProps> = (
  props,
) => (
  <Flex {...props} alignItems="center" justifyContent="space-between">
    <Box>
      <Text color="text.alternative" fontSize="xs">
        <Trans>
          &copy;{new Date().getFullYear()} MetaMask. All rights reserved.
        </Trans>{' '}
        <Link href="https://consensys.io/privacy-policy/" isExternal={true}>
          <Trans>Privacy Policy</Trans>
        </Link>{' '}
        &{' '}
        <Link href="https://consensys.io/terms-of-use/" isExternal={true}>
          <Trans>Terms of Use</Trans>
        </Link>
      </Text>
    </Box>
    <LocalePicker />
  </Flex>
);
