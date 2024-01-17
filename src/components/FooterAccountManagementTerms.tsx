import { Box, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { FooterTerms } from './FooterTerms';

export const FooterAccountManagementTerms: FunctionComponent = () => (
  <Box>
    <Text color="text.alternative" fontSize="xs" fontWeight="bold">
      <Trans>Experimental Beta</Trans>
    </Text>
    <Text color="text.alternative" fontSize="xs">
      <Trans>
        Account Management Snaps are released as part of an experimental beta
        release. You agree that you will only use one of these Snaps if you
        understand how it functions and how to use it, and you have fully read
        and understand all risk warnings and other disclosures made available by
        the Third Party Service provider relating to use of their Snap. You
        agree that Consensys is not responsible for any injury that you incur as
        a result of your use of this Snap.
      </Trans>
    </Text>
    <Text color="text.alternative" fontSize="xs" marginBottom="4">
      <Trans>
        You will not be able to use your MetaMask Secret Recovery Phrase to
        recover accounts added through Account Management Snaps. If your account
        credentials are lost or compromised, MetaMask will not be able to help
        you. If the Snap or the associated dapp is hacked or ceases to function,
        you may not be able to access your account and the funds in your
        account.
      </Trans>
    </Text>
    <FooterTerms />
  </Box>
);
