import { Menu, MenuButton, MenuList } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';

import { FilterButton } from './FilterButton';
import { FilterCategory } from './FilterCategory';
import type { RegistrySnapCategory } from './SnapCategory';
import { SNAP_CATEGORY_LABELS } from './SnapCategory';

export type FilterMenuProps = {
  selectedCategories: RegistrySnapCategory[];
  onToggle: (category: RegistrySnapCategory) => void;
};

export const FilterMenu: FunctionComponent<FilterMenuProps> = ({
  selectedCategories,
  onToggle,
}) => {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={FilterButton} />
      <MenuList>
        {Object.entries(SNAP_CATEGORY_LABELS).map(
          ([category, { name, icon }]) => (
            <FilterCategory
              key={name.id}
              category={category as RegistrySnapCategory}
              icon={icon}
              enabled={selectedCategories.includes(
                category as RegistrySnapCategory,
              )}
              onToggle={onToggle}
            />
          ),
        )}
      </MenuList>
    </Menu>
  );
};
