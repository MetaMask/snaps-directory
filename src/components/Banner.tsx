import { Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

export const Banner: FunctionComponent = () => (
  <Flex
    flexDirection="column"
    alignItems="center"
    paddingY="12"
    textAlign="center"
  >
    <Heading as="h2" fontSize={['3xl', null, '5xl']} marginBottom="4">
      <Trans>Discover Snaps</Trans>
    </Heading>
    <Box maxWidth="33.5rem">
      <Text fontSize={['md', null, '2xl']}>
        <Trans>
          Explore, install, and use community-built features in MetaMask.{' '}
          <Link href="https://metamask.io/snaps/" isExternal={true}>
            Learn more
          </Link>{' '}
          and{' '}
          <Link
            href="https://support.metamask.io/hc/en-us/articles/18245938714395"
            isExternal={true}
          >
            FAQ
          </Link>
          .
        </Trans>
      </Text>
    </Box>
  </Flex>
);
