import { Text } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import type { FunctionComponent } from 'react';

import { useLocale } from '../hooks';

type InstallationCountProps = {
  installs: number;
  minimal?: boolean;
  color?: string;
};

export const InstallationCount: FunctionComponent<InstallationCountProps> = ({
  installs,
  minimal = false,
  color = 'icon.muted',
}) => {
  const { locale } = useLocale();
  const { _ } = useLingui();

  const formattedNumber = new Intl.NumberFormat(locale, {
    notation: 'compact',
  }).format(installs);

  if (minimal) {
    return (
      <Text color={color}>
        {installs >= 1000 ? formattedNumber : _(t`< 1K`)}
      </Text>
    );
  }

  return (
    <Text color={color}>
      {installs >= 1000
        ? _(t`${formattedNumber} installs`)
        : _(t`< 1K installs`)}
    </Text>
  );
};
