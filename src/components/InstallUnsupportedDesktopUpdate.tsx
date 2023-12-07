import { Button, Heading, Link, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

export type InstallUnsupportedDesktopUpdateProps = {
  onClose: () => void;
};

export const InstallUnsupportedDesktopUpdate: FunctionComponent<
  InstallUnsupportedDesktopUpdateProps
> = ({ onClose }) => (
  <>
    <Heading as="h3" fontSize="lg" marginTop="6" marginBottom="4">
      <Trans>Update required</Trans>
    </Heading>
    <Text color="text.alternative" marginBottom="4">
      <Trans>
        To use MetaMask Snaps, you need the latest version (11.0) of MetaMask in
        your browser.{' '}
        <Link
          href="https://support.metamask.io/hc/en-us/articles/360060268452-How-to-update-the-version-of-MetaMask"
          isExternal={true}
        >
          Learn more.
        </Link>
      </Trans>
    </Text>
    <Button onClick={onClose} variant="primary" width="100%">
      <Trans>Got it</Trans>
    </Button>
  </>
);
