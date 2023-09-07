import type { BoxProps } from '@chakra-ui/react';
import { Box, Container, Flex, Image, Link, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import metamaskLogo from '../assets/metamask-logo.svg';

export type FooterProps = BoxProps;

export const Footer: FunctionComponent<FooterProps> = (props) => (
  <Box
    {...props}
    as="footer"
    background="white"
    marginTop={{ base: 4, md: 20 }}
  >
    <Container maxWidth="7xl" paddingY="8">
      <Image src={metamaskLogo} alt="MetaMask" marginBottom="4" />
      <Text
        variant="muted"
        display="block"
        maxWidth="480px"
        marginBottom={['12', null, '24']}
      >
        <Trans>
          Start exploring blockchain applications in seconds. Trusted by over 30
          million users worldwide.
        </Trans>
      </Text>
      <Flex
        justifyContent="space-between"
        flexDirection={['column', null, 'row']}
        gap="1"
      >
        <Text variant="muted" fontSize="xs">
          <Trans>
            &copy;{new Date().getFullYear()} MetaMask. All rights reserved.
          </Trans>
        </Text>
        <Text variant="muted" fontSize="xs">
          <Link href="https://consensys.io/privacy-policy/" isExternal={true}>
            <Trans>Privacy Policy</Trans>
          </Link>{' '}
          &{' '}
          <Link href="https://consensys.io/terms-of-use/" isExternal={true}>
            Terms of Use
          </Link>
        </Text>
      </Flex>
    </Container>
  </Box>
);
