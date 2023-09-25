import { Box, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react';
import type { FunctionComponent } from 'react';

import { FilterItem } from './FilterItem';
import type { IconName } from '../../../components';
import { Icon } from '../../../components';
import { SNAP_CATEGORY_LABELS } from '../../../constants';
import { useDispatch, useSelector } from '../../../hooks';
import type { RegistrySnapCategory } from '../store';
import { getCategory, toggleCategory } from '../store';

export type FilterCategoryProps = {
  category: RegistrySnapCategory;
  icon: IconName;
};

export const FilterCategory: FunctionComponent<FilterCategoryProps> = ({
  category,
  icon,
}) => {
  const dispatch = useDispatch();
  const checked = useSelector(getCategory(category));

  const handleClick = () => {
    dispatch(toggleCategory(category));
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
