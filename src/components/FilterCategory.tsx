import { MenuItem, Stack, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react';
import type { FunctionComponent } from 'react';

import type { IconName } from './Icon';
import { Icon } from './Icon';
import type { RegistrySnapCategory } from './SnapCategory';
import { SNAP_CATEGORY_LABELS } from './SnapCategory';

export type FilterCategoryProps = {
  category: RegistrySnapCategory;
  icon: IconName;
  enabled: boolean;
  onToggle: (category: RegistrySnapCategory) => void;
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
        <Text>
          <Trans id={SNAP_CATEGORY_LABELS[category].name.id} />
        </Text>
      </Stack>
    </MenuItem>
  );
};
