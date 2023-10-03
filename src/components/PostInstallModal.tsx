import {
  Center,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent, ReactNode } from 'react';

import { PostInstallSnapWebsiteButton } from './PostInstallSnapWebsiteButton';
import { SnapAvatar } from './SnapAvatar';

export type PostInstallModalProps = {
  isOpen: boolean;
  onClose: () => void;

  snapId: string;
  name: string;
  icon: string;
  website?: string;

  children: ReactNode;
};

/**
 * A modal that is shown after a Snap is installed.
 *
 * @param props - The component props.
 * @param props.isOpen - Whether the modal is open.
 * @param props.onClose - A function to close the modal.
 * @param props.snapId - The ID of the Snap.
 * @param props.name - The name of the Snap.
 * @param props.icon - The icon of the Snap.
 * @param props.website - The website of the Snap.
 * @param props.children - The children to render outside of the modal.
 * @returns A React component.
 */
export const PostInstallModal: FunctionComponent<PostInstallModalProps> = ({
  isOpen,
  onClose,
  snapId,
  name,
  icon,
  website,
  children,
}) => {
  return (
    <>
      <Modal variant="minimal" size="xs" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Center flexDirection="column">
              <SnapAvatar
                snapName={name}
                icon={icon}
                isInstalled={true}
                marginBottom="4"
              />
              <Heading as="h3" fontSize="lg" marginBottom="4">
                <Trans>Installation complete</Trans>
              </Heading>
              {website ? (
                <>
                  <Text variant="muted" textAlign="center" marginBottom="4">
                    <Trans>
                      Continue to {name}&apos;s website to get started with this
                      snap.
                    </Trans>
                  </Text>
                  <PostInstallSnapWebsiteButton
                    snapId={snapId}
                    website={website}
                  />
                </>
              ) : (
                <Text variant="muted" textAlign="center">
                  <Trans>{name} is now ready to use.</Trans>
                </Text>
              )}
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
      {children}
    </>
  );
};
