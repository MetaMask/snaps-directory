import { Box, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react';
import type { FunctionComponent } from 'react';

import { FilterItem } from './FilterItem';
import type { IconName } from './Icon';
import { Icon } from './Icon';
import type { RegistrySnapCategory } from '../state';
import { SNAP_CATEGORY_LABELS } from '../state';

export type FilterCategoryProps = {
  category: RegistrySnapCategory;
  icon: IconName;
  checked: boolean;
  onToggle: (category: RegistrySnapCategory) => void;
};

export const FilterCategory: FunctionComponent<FilterCategoryProps> = ({
  category,
  icon,
  checked,
  onToggle,
}) => {
  const handleClick = () => {
    onToggle(category);
  };

  return (
    <FilterItem checked={checked} onClick={handleClick}>
      <Text>
        <Trans id={SNAP_CATEGORY_LABELS[category].name.id} />
      </Text>
      <Box flexGrow={1} />
      <Icon icon={icon} width="32px" />
    </FilterItem>
  );
};
