import { IconButton, useColorMode } from '@chakra-ui/react';
import { t } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { Icon } from './Icon';

export const ColorModeToggle: FunctionComponent = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      marginLeft="auto"
      aria-label={t`Toggle color mode`}
      variant="clear"
      icon={
        <Icon
          icon={colorMode === 'dark' ? 'lightMode' : 'darkMode'}
          width="24px"
        />
      }
      onClick={toggleColorMode}
    />
  );
};
