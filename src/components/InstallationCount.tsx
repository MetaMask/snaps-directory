import { Text } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import type { FunctionComponent } from 'react';

import { useLocale } from '../hooks';

type InstallationCountProps = {
  installs: number;
};

export const InstallationCount: FunctionComponent<InstallationCountProps> = ({
  installs,
}) => {
  const { locale } = useLocale();
  const { _ } = useLingui();

  return (
    <Text color="icon.muted">
      {installs >= 1000
        ? _(
            t`${new Intl.NumberFormat(locale, { notation: 'compact' }).format(
              installs,
            )} installs`,
          )
        : _(t`< 1K installs`)}
    </Text>
  );
};
