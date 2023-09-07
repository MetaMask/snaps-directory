import { Button, useDisclosure } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { Icon } from './Icon';
import { InstallUnsupportedDesktop } from './InstallUnsupportedDesktop';
import { InstallUnsupportedMobile } from './InstallUnsupportedMobile';

export const InstallUnsupported: FunctionComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isMobile =
    typeof navigator !== 'undefined' &&
    // Basic RegExp to detect mobile devices. This is not a perfect solution,
    // but it should be good enough.
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/iu.test(
      navigator.userAgent,
    );

  const button = (
    <Button
      leftIcon={<Icon icon="metamask" width="20px" />}
      variant="primary"
      onClick={onOpen}
    >
      <Trans>Add to MetaMask</Trans>
    </Button>
  );

  if (isMobile) {
    return (
      <>
        <InstallUnsupportedMobile isOpen={isOpen} onClose={onClose} />
        {button}
      </>
    );
  }

  return (
    <>
      <InstallUnsupportedDesktop isOpen={isOpen} onClose={onClose} />
      {button}
    </>
  );
};
