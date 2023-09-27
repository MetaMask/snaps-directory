import {
  Button,
  Center,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { Fox } from './Fox';
import { InstallUnsupportedDesktopUpdate } from './InstallUnsupportedDesktopUpdate';
import { SnapStatus, useSupportedVersion } from '../hooks';

export type InstallUnsupportedDesktopProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const InstallUnsupportedDesktop: FunctionComponent<
  InstallUnsupportedDesktopProps
> = ({ isOpen, onClose }) => {
  const isSupported = useSupportedVersion();

  return (
    <Modal variant="minimal" size="xs" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Center flexDirection="column">
            <Fox />
            {isSupported === SnapStatus.Unsupported ? (
              <InstallUnsupportedDesktopUpdate onClose={onClose} />
            ) : (
              <>
                <Heading as="h3" fontSize="lg" marginTop="6" marginBottom="4">
                  <Trans>Install MetaMask</Trans>
                </Heading>
                <Text variant="muted" marginBottom="4">
                  <Trans>
                    To use MetaMask Snaps, you need the extension in your
                    browser.
                  </Trans>
                </Text>
                <Link
                  display="block"
                  width="100%"
                  href="https://metamask.io/download"
                  isExternal={true}
                >
                  <Button variant="primary" width="100%">
                    <Trans>Download MetaMask</Trans>
                  </Button>
                </Link>
              </>
            )}
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
