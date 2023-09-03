import { Menu, MenuButton, MenuList } from '@chakra-ui/react';
import type { FunctionComponent } from 'react';
import { useState } from 'react';

import { FilterButton } from './FilterButton';
import { FilterCategory } from './FilterCategory';
import type { IconName } from './Icon';

export type Category = {
  category: string;
  icon: IconName;
};

export const FILTER_CATEGORIES: Category[] = [
  {
    category: 'Transaction insights',
    icon: 'transactionInsights',
  },
  {
    category: 'Interoperability',
    icon: 'interoperability',
  },
  {
    category: 'Notifications',
    icon: 'notifications',
  },
];

export const FilterMenu: FunctionComponent = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    FILTER_CATEGORIES.map(({ category }) => category),
  );

  const handleToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      return setSelectedCategories(
        selectedCategories.filter((item) => item !== category),
      );
    }

    return setSelectedCategories([...selectedCategories, category]);
  };

  return (
    <Menu closeOnSelect={false}>
      <MenuButton as={FilterButton} />
      <MenuList>
        {FILTER_CATEGORIES.map(({ category, icon }) => (
          <FilterCategory
            key={category}
            category={category}
            icon={icon}
            enabled={selectedCategories.includes(category)}
            onToggle={handleToggle}
          />
        ))}
      </MenuList>
    </Menu>
  );
};
