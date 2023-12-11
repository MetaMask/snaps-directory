import { Box } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import type { IconProps } from './icons';

export type AvatarIconProps = {
  icon: FunctionComponent<IconProps>;
};

export const AvatarIcon: FunctionComponent<AvatarIconProps> = ({
  icon: Icon,
}) => {
  return (
    <Box padding="0.375rem" borderRadius="1rem" background="info.muted">
      <Icon width="1.25rem" height="1.25rem" />
    </Box>
  );
};
