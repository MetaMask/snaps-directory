import { Link, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

export const FooterTerms: FunctionComponent = () => (
  <Text color="text.alternative" fontSize="xs" marginBottom="6">
    <Trans>
      You acknowledge that any Snap that you install is a Third Party Service,
      unless otherwise identified, as defined in the{' '}
      <Link href="https://consensys.io/terms-of-use/" isExternal={true}>
        Consensys Terms of Use
      </Link>
      . Your use of Third Party Services is governed by separate terms and
      conditions set forth by the Third Party Service provider. Consensys does
      not recommend the use of any Snap by any particular person for any
      particular reason. You access, rely upon or use the Third Party Service at
      your own risk. Consensys disclaims all responsibility and liability for
      any losses on account of your use of Third Party Services. Any information
      you share with Third Party Services will be collected directly by those
      Third Party Services in accordance with their privacy policies. Please
      refer to their privacy policies for more information. Consensys has no
      access to information you share with Third Party Services.
    </Trans>
  </Text>
);
