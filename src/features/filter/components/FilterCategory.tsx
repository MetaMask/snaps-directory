import { Box, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react';
import type { FunctionComponent } from 'react';

import type { IconProps } from '../../../components/icons/Icon';
import { SNAP_CATEGORY_LABELS } from '../../../constants';
import type { RegistrySnapCategory } from '../../../constants';
import { useDispatch, useSelector } from '../../../hooks';
import { getCategory, toggleCategory } from '../store';
import { FilterItem } from './FilterItem';

export type FilterCategoryProps = {
  category: RegistrySnapCategory;
  icon: FunctionComponent<IconProps>;
};

export const FilterCategory: FunctionComponent<FilterCategoryProps> = ({
  category,
  icon: Icon,
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
      <Icon width="2rem" fill="info.default" />
    </FilterItem>
  );
};
