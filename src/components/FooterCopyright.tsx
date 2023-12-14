import type { BoxProps } from '@chakra-ui/react';
import { Box, Link, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

export type FooterCopyrightProps = BoxProps;

export const FooterCopyright: FunctionComponent<FooterCopyrightProps> = (
  props,
) => (
  <Box {...props}>
    <Text color="text.alternative" fontSize="xs">
      <Trans>
        &copy;{new Date().getFullYear()} MetaMask. All rights reserved.
      </Trans>{' '}
      <Link href="https://consensys.io/privacy-policy/" isExternal={true}>
        <Trans>Privacy Policy</Trans>
      </Link>{' '}
      &{' '}
      <Link href="https://consensys.io/terms-of-use/" isExternal={true}>
        Terms of Use
      </Link>
    </Text>
  </Box>
);
