import { Box, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react';
import type { FunctionComponent } from 'react';

import { FilterItem } from './FilterItem';
import type { IconName } from './Icon';
import { Icon } from './Icon';
import { SELECT_CATEGORY, UNSELECT_CATEGORY, useFilter } from '../hooks';
import type { RegistrySnapCategory } from '../state';
import { SNAP_CATEGORY_LABELS } from '../state';

export type FilterCategoryProps = {
  category: RegistrySnapCategory;
  icon: IconName;
};

export const FilterCategory: FunctionComponent<FilterCategoryProps> = ({
  category,
  icon,
}) => {
  const [state, dispatch] = useFilter();
  const isChecked = state.categories.includes(category);

  const handleClick = () => {
    if (isChecked) {
      return dispatch({
        type: UNSELECT_CATEGORY,
        payload: category,
      });
    }

    return dispatch({
      type: SELECT_CATEGORY,
      payload: category,
    });
  };

  return (
    <FilterItem checked={isChecked} onClick={handleClick}>
      <Text>
        <Trans id={SNAP_CATEGORY_LABELS[category].name.id} />
      </Text>
      <Box flexGrow={1} />
      <Icon icon={icon} width="32px" />
    </FilterItem>
  );
};
