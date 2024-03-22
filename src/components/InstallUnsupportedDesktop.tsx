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
import { MetaMaskIcon } from './icons';
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
    <Modal
      variant="minimal"
      size="xs"
      isOpen={isOpen}
      onClose={onClose}
      preserveScrollBarGap
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Center flexDirection="column">
            <Fox />
            {isSupported === SnapStatus.Unsupported ? (
              <InstallUnsupportedDesktopUpdate onClose={onClose} />
            ) : (
              <>
                <Heading as="h3" fontSize="2xl" marginTop="3" marginBottom="4">
                  <Trans>Install MetaMask</Trans>
                </Heading>
                <Text
                  color="text.alternative"
                  marginBottom="4"
                  textAlign="center"
                >
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
                  <Button
                    leftIcon={<MetaMaskIcon width="1.3rem" />}
                    variant="primary"
                    width="100%"
                  >
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
