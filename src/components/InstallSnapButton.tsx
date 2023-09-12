import { Button, useDisclosure } from '@chakra-ui/react';
import { t, Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';
import { useState } from 'react';

import { Icon } from './Icon';
import { InstallUnsupported } from './InstallUnsupported';
import { PostInstallModal } from './PostInstallModal';
import { SnapStatus, useEthereumProvider, useSupportedVersion } from '../hooks';

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
  const { provider, snaps, updateSnaps } = useEthereumProvider();
  const [installing, setInstalling] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isSupportedVersion = useSupportedVersion();

  const isInstalled = Boolean(snaps[snapId]);

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
      .finally(() => {
        updateSnaps();
        setInstalling(false);
      });
  };

  if (
    !provider ||
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
          isDisabled={!provider}
          isLoading={installing}
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
