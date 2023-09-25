import { Button, useDisclosure } from '@chakra-ui/react';
import { t, Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { Icon } from './Icon';
import { InstallUnsupported } from './InstallUnsupported';
import { PostInstallModal } from './PostInstallModal';
import { useGetInstalledSnapsQuery, useInstallSnapMutation } from '../features';
import { SnapStatus, useSupportedVersion } from '../hooks';

type InstallSnapButtonProps = {
  snapId: string;
  name: string;
  icon: string;
  website: string;
  version: string;
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
    <>
      <PostInstallModal
        isOpen={isOpen}
        onClose={onClose}
        name={name}
        icon={icon}
        website={website}
      />

      {isInstalled ? (
        <Button
          leftIcon={<Icon icon="check" width="20px" />}
          variant="primary"
          isDisabled={true}
          width={{ base: '100%', md: 'auto' }}
        >
          <Trans>Installed</Trans>
        </Button>
      ) : (
        <Button
          leftIcon={<Icon icon="metamask" width="24px" />}
          variant="primary"
          isLoading={isLoading}
          loadingText={t`Installing ${name}`}
          onClick={handleInstall}
          width={{ base: '100%', md: 'auto' }}
          _hover={{ opacity: '75%' }}
        >
          <Trans>Add to MetaMask</Trans>
        </Button>
      )}
    </>
  );
};
