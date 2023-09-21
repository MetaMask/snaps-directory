import { Menu, MenuButton, MenuGroup, MenuList, Text } from '@chakra-ui/react';
import { t, Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import { FilterButton } from './FilterButton';
import { FilterCategory } from './FilterCategory';
import { FilterItem } from './FilterItem';
import {
  SELECT_ALL,
  SELECT_CATEGORY,
  SELECT_INSTALLED,
  useFilter,
} from '../hooks';
import type { RegistrySnapCategory } from '../state';
import { SNAP_CATEGORY_LABELS } from '../state';

export const FilterMenu: FunctionComponent = () => {
  const [state, dispatch] = useFilter();

  const handleClickAll = () => {
    dispatch({
      type: SELECT_ALL,
    });
  };

  const handleClickInstalled = () => {
    dispatch({
      type: SELECT_INSTALLED,
    });
  };

  const handleToggle = (category: RegistrySnapCategory) => {
    dispatch({
      type: SELECT_CATEGORY,
      payload: category,
    });
  };

  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={FilterButton} />
      <MenuList>
        <MenuGroup marginLeft="2" title={t`Filter`}>
          <FilterItem checked={state.all} onClick={handleClickAll}>
            <Text>
              <Trans>All</Trans>
            </Text>
          </FilterItem>
          <FilterItem checked={state.installed} onClick={handleClickInstalled}>
            <Text>
              <Trans>Installed</Trans>
            </Text>
          </FilterItem>
        </MenuGroup>
        <MenuGroup marginLeft="2" title={t`Categories`}>
          {Object.entries(SNAP_CATEGORY_LABELS).map(
            ([category, { name, icon }]) => (
              <FilterCategory
                key={name.id}
                category={category as RegistrySnapCategory}
                icon={icon}
                checked={state.categories.includes(
                  category as RegistrySnapCategory,
                )}
                onToggle={handleToggle}
              />
            ),
          )}
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};
