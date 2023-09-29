import {
  Box,
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
import type { FunctionComponent, ReactNode } from 'react';

import { ExternalLinkIcon } from './icons';
import { SnapAvatar } from './SnapAvatar';

export type PostInstallModalProps = {
  isOpen: boolean;
  onClose: () => void;

  name: string;
  icon: string;
  website?: string;

  children: ReactNode;
};

/**
 * Normalize a URL to its host and pathname.
 *
 * @param value - The URL to normalize.
 * @returns The normalized URL.
 */
function normalizeUrl(value: string): string {
  try {
    const url = new URL(value);
    const path = url.pathname === '/' ? '' : url.pathname;
    return url.host + path;
  } catch {
    return value;
  }
}

/**
 * A modal that is shown after a Snap is installed.
 *
 * @param props - The component props.
 * @param props.isOpen - Whether the modal is open.
 * @param props.onClose - A function to close the modal.
 * @param props.name - The name of the Snap.
 * @param props.icon - The icon of the Snap.
 * @param props.website - The website of the Snap.
 * @param props.children - The children to render outside of the modal.
 * @returns A React component.
 */
export const PostInstallModal: FunctionComponent<PostInstallModalProps> = ({
  isOpen,
  onClose,
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
                  <Link variant="box" href={website} isExternal={true}>
                    <Flex justifyContent="space-between" alignItems="center">
                      <Box
                        as="span"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                      >
                        {normalizeUrl(website)}
                      </Box>
                      {/* TODO: Muted icon */}
                      <ExternalLinkIcon marginLeft="2" width="1.25rem" />
                    </Flex>
                  </Link>
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
