import { Button, useDisclosure } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';
import { useState } from 'react';

import { Icon } from './Icon';
import { PostInstallModal } from './PostInstallModal';
import { useEthereumProvider, useInstalledSnaps } from '../hooks';

type InstallSnapButtonProps = {
  snapId: string;
  name: string;
  icon: string;
  version: string;
};

export const InstallSnapButton: FunctionComponent<InstallSnapButtonProps> = ({
  snapId,
  name,
  icon,
  version,
}) => {
  const provider = useEthereumProvider();
  const installedSnaps = useInstalledSnaps();
  const [installing, setInstalling] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isInstalled = Boolean(installedSnaps[snapId]);

  const handleInstall = () => {
    if (!provider || installing) {
      return;
    }

    setInstalling(true);
    provider
      .request({
        method: 'wallet_requestSnaps',
        params: {
          [snapId]: {
            version,
          },
        },
      })
      // TODO: Notify user of failure.
      .then(() => onOpen())
      .catch((error) => console.error(error))
      .finally(() => setInstalling(false));
  };

  if (isInstalled) {
    return (
      <Button
        leftIcon={<Icon icon="check" width="20px" />}
        variant="primary"
        isDisabled={true}
      >
        <Trans>Installed</Trans>
      </Button>
    );
  }

  return (
    <>
      <PostInstallModal
        isOpen={isOpen}
        onClose={onClose}
        name={name}
        icon={icon}
      />

      <Button
        leftIcon={<Icon icon="metamask" width="20px" />}
        variant="primary"
        isDisabled={!provider}
        isLoading={installing}
        loadingText={`Install ${name}`}
        onClick={handleInstall}
      >
        <Trans>Install {name}</Trans>
      </Button>
    </>
  );
};
