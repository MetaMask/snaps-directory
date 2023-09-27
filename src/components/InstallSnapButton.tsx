import { Button, useDisclosure } from '@chakra-ui/react';
import { t, Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { Icon } from './Icon';
import { InstallUnsupported } from './InstallUnsupported';
import { PostInstallModal } from './PostInstallModal';
import {
  getUpdateAvailable,
  useGetInstalledSnapsQuery,
  useInstallSnapMutation,
} from '../features';
import { SnapStatus, useSelector, useSupportedVersion } from '../hooks';

export type InstallSnapButtonProps = {
  snapId: string;
  name: string;
  icon: string;
  website: string;
  version: string;
};

type InstallButtonProps = {
  name: string;
  isInstalled: boolean;
  updateAvailable: boolean;
  isLoading: boolean;
  handleInstall: () => void;
};

/**
 * The actual button component that is rendered. This is separated from the
 * main component, to avoid nesting ternaries in the main component.
 *
 * @param props - The component props.
 * @param props.name - The name of the Snap.
 * @param props.isLoading - Whether the button is loading.
 * @param props.isInstalled - Whether the Snap is installed.
 * @param props.updateAvailable - Whether an update is available.
 * @param props.handleInstall - A function to install the Snap.
 * @returns A React component.
 */
const InstallButton: FunctionComponent<InstallButtonProps> = ({
  name,
  isLoading,
  isInstalled,
  updateAvailable,
  handleInstall,
}) => {
  if (updateAvailable) {
    return (
      <Button
        leftIcon={<Icon icon="metamask" width="24px" />}
        variant="primary"
        isLoading={isLoading}
        loadingText={t`Updating ${name}`}
        onClick={handleInstall}
        width={{ base: '100%', md: 'auto' }}
      >
        <Trans>Update Snap</Trans>
      </Button>
    );
  }

  if (isInstalled) {
    return (
      <Button
        leftIcon={<Icon icon="check" width="20px" />}
        variant="primary"
        isDisabled={true}
        width={{ base: '100%', md: 'auto' }}
      >
        <Trans>Installed</Trans>
      </Button>
    );
  }

  return (
    <Button
      leftIcon={<Icon icon="metamask" width="24px" />}
      variant="primary"
      isLoading={isLoading}
      loadingText={t`Installing ${name}`}
      onClick={handleInstall}
      width={{ base: '100%', md: 'auto' }}
    >
      <Trans>Add to MetaMask</Trans>
    </Button>
  );
};

export const InstallSnapButton: FunctionComponent<InstallSnapButtonProps> = ({
  snapId,
  name,
  icon,
  website,
  version,
}) => {
  const { data: installedSnaps } = useGetInstalledSnapsQuery();
  const [installSnap, { isLoading }] = useInstallSnapMutation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isSupportedVersion = useSupportedVersion();
  const updateAvailable = useSelector(getUpdateAvailable(snapId));

  const isInstalled = Boolean(installedSnaps?.[snapId]);

  const handleInstall = () => {
    installSnap({ snapId, version })
      .then((result) => {
        if ('error' in result) {
          return;
        }

        onOpen();
      })
      .catch(console.error);
  };

  if (
    isSupportedVersion === SnapStatus.Unsupported ||
    isSupportedVersion === SnapStatus.Unknown
  ) {
    return <InstallUnsupported />;
  }

  return (
    <PostInstallModal
      isOpen={isOpen}
      onClose={onClose}
      name={name}
      icon={icon}
      website={website}
    >
      <InstallButton
        name={name}
        isInstalled={isInstalled}
        updateAvailable={updateAvailable}
        isLoading={isLoading}
        handleInstall={handleInstall}
      />
    </PostInstallModal>
  );
};
