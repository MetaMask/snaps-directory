import {
  Center,
  Flex,
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

import { Icon } from './Icon';
import { SnapIcon } from './SnapIcon';

export type PostInstallModalProps = {
  isOpen: boolean;
  onClose: () => void;

  // TODO: Add website.
  name: string;
  icon: string;
};

export const PostInstallModal: FunctionComponent<PostInstallModalProps> = ({
  isOpen,
  onClose,
  name,
  icon,
}) => {
  return (
    <Modal variant="minimal" size="xs" isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <Center flexDirection="column">
            <SnapIcon
              snapName={name}
              icon={icon}
              isInstalled={true}
              marginBottom="4"
            />
            <Heading as="h3" fontSize="lg" marginBottom="4">
              <Trans>Installation complete</Trans>
            </Heading>
            <Text variant="muted" textAlign="center" marginBottom="4">
              <Trans>
                Continue to {name}&apos;s website to get started with this snap.
              </Trans>
            </Text>
            <Link
              variant="box"
              href="https://organization.com/snap"
              isExternal={true}
            >
              <Flex justifyContent="space-between" alignItems="center">
                <span>organization.com/snap</span>
                <Icon icon="externalLinkMuted" marginLeft="2" width="20px" />
              </Flex>
            </Link>
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
