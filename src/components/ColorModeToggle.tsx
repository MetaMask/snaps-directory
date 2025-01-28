import { IconButton, useColorMode } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import type { FunctionComponent } from 'react';

import { DarkModeIcon } from './icons';

export const ColorModeToggle: FunctionComponent = () => {
  const { _ } = useLingui();
  const { toggleColorMode } = useColorMode();

  return (
    <IconButton
      flexShrink="0"
      aria-label={_(t`Toggle color mode`)}
      variant="clear"
      icon={<DarkModeIcon width="0.75rem" color="text.default" />}
      onClick={toggleColorMode}
    />
  );
};
