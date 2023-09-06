import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Text,
} from '@chakra-ui/react';
import { t, Trans } from '@lingui/macro';
import { StaticImage } from 'gatsby-plugin-image';
import type { FunctionComponent } from 'react';

type InstallMobileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

/**
 * Render Mobile Drawer component used to display a message
 * when trying to install a Snap on the mobile devices.
 *
 * @param options0 - Configuration for controlling drawer state.
 * @param options0.isOpen - Boolean indicator of drawer state.
 * @param options0.onClose - Callback handler for closing the drawer.
 * @returns A React component that renders the drawer.
 */
export const InstallMobileDrawer: FunctionComponent<
  InstallMobileDrawerProps
> = ({ isOpen, onClose }) => {
  return (
    <>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen} size="lg">
        <DrawerOverlay />
        <DrawerContent borderTopRadius="3rem">
          <DrawerBody>
            <Flex
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              paddingTop={4}
              paddingBottom={6}
            >
              <StaticImage
                src="../assets/images/desktop_only.svg"
                alt={t`desktop only`}
              />
              <Text fontSize="2xl" marginTop={4}>
                <Trans>Desktop only</Trans>
              </Text>
              <Text textAlign="center" marginTop={4}>
                <Trans>
                  MetaMask Snaps is in open beta and only supported via our
                  extension clients on desktop such as Brave, Chrome, or
                  Firefox.
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
    </>
  );
};
