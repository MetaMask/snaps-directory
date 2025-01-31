import { IconButton, useColorMode } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import type { FunctionComponent } from 'react';

import { DarkModeIcon, LightModeIcon } from './icons';

export const ColorModeToggle: FunctionComponent = () => {
  const { _ } = useLingui();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      flexShrink="0"
      aria-label={_(t`Toggle color mode`)}
      variant="outline"
      icon={
        colorMode === 'light' ? (
          <DarkModeIcon width="0.75rem" />
        ) : (
          <LightModeIcon width="0.75rem" />
        )
      }
      onClick={toggleColorMode}
    />
  );
};
