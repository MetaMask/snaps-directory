import type { MenuItemProps } from '@chakra-ui/react';
import { MenuItem, Stack } from '@chakra-ui/react';
import type { FunctionComponent, ReactNode } from 'react';

import { Icon } from './Icon';

export type FilterItemProps = MenuItemProps & {
  checked: boolean;
  children: ReactNode;
};

export const FilterItem: FunctionComponent<FilterItemProps> = ({
  checked,
  children,
  ...props
}) => (
  <MenuItem height="48px" borderRadius="md" {...props}>
    <Stack direction="row" alignItems="center" gap="2" width="100%">
      <Icon
        icon="checkBlue"
        width="20px"
        visibility={checked ? 'initial' : 'hidden'}
      />
      {children}
    </Stack>
  </MenuItem>
);
