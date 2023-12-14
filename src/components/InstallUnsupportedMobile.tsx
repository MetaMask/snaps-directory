import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Link,
  Text,
} from '@chakra-ui/react';
import { t, Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { MetaMaskIcon } from './icons';

export type InstallUnsupportedMobileProps = {
  isOpen: boolean;
  onClose: () => void;
};

/**
 * Render Mobile Drawer component used to display a message
 * when trying to install a Snap on the mobile devices.
 *
 * @param props - Configuration for controlling drawer state.
 * @param props.isOpen - Boolean indicator of drawer state.
 * @param props.onClose - Callback handler for closing the drawer.
 * @returns A React component that renders the drawer.
 */
export const InstallUnsupportedMobile: FunctionComponent<
  InstallUnsupportedMobileProps
> = ({ isOpen, onClose }) => {
  return (
    <Drawer placement="bottom" onClose={onClose} isOpen={isOpen} size="lg">
      <DrawerOverlay />
      <DrawerContent borderTopRadius="3rem">
        <DrawerBody padding="6">
          <Flex
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Box maxWidth="18.75rem">
              <MetaMaskIcon
                role="img"
                aria-label={t`Desktop only`}
                width="100%"
                maxWidth="9.5rem"
              />
            </Box>
            <Heading as="h3" fontSize="xl" marginTop={4}>
              <Trans>Available on desktop</Trans>
            </Heading>
            <Text color="text.alternative" textAlign="center" marginTop={4}>
              <Trans>
                MetaMask Snaps is in open beta and only supported via our
                extension clients on desktop such as{' '}
                <Link href="https://brave.com/" isExternal={true}>
                  Brave
                </Link>
                ,{' '}
                <Link href="https://www.google.com/chrome/" isExternal={true}>
                  Chrome
                </Link>
                , or{' '}
                <Link
                  href="https://www.mozilla.org/firefox/new/"
                  isExternal={true}
                >
                  Firefox
                </Link>
                .
              </Trans>
            </Text>
            <Button
              onClick={onClose}
              variant="primary"
              width="100%"
              marginTop={4}
            >
              <Trans>Got it</Trans>
            </Button>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
