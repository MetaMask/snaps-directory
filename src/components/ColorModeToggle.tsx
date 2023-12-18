import { IconButton, useColorMode } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { DarkModeIcon, LightModeIcon } from './icons';

export const ColorModeToggle: FunctionComponent = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      marginLeft="auto"
      aria-label={t`Toggle color mode`}
      variant="clear"
      icon={
        colorMode === 'light' ? (
          <DarkModeIcon width="2.25rem" />
        ) : (
          <LightModeIcon width="2.25rem" fill="text.alternative" />
        )
      }
      onClick={toggleColorMode}
    />
  );
};
