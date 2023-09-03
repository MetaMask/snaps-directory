import { MenuItem, Stack, Text } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import type { IconName } from './Icon';
import { Icon } from './Icon';

export type FilterCategoryProps = {
  category: string;
  icon: IconName;
  enabled: boolean;
  onToggle: (category: string) => void;
};

export const FilterCategory: FunctionComponent<FilterCategoryProps> = ({
  category,
  icon,
  enabled,
  onToggle,
}) => {
  const handleClick = () => {
    onToggle(category);
  };

  return (
    <MenuItem onClick={handleClick}>
      <Stack direction="row" alignItems="center" gap="2">
        <Icon
          icon="checkBlue"
          width="20px"
          visibility={enabled ? 'initial' : 'hidden'}
        />
        <Icon icon={icon} width="32px" />
        <Text>{category}</Text>
      </Stack>
    </MenuItem>
  );
};
