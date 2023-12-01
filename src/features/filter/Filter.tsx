import { Menu, MenuButton, MenuGroup, MenuList, Text } from '@chakra-ui/react';
import { t, Trans } from '@lingui/macro';
import type { FunctionComponent } from 'react';

import {
  FilterButton,
  FilterCategory,
  FilterItem,
  FilterSearch,
  FilterTags,
} from './components';
import { FilterOrder } from './components/FilterOrder';
import { Order, SNAP_CATEGORY_ICONS } from './constants';
import { filterAll, getAll, getInstalled, toggleInstalled } from './store';
import type { RegistrySnapCategory } from '../../constants';
import { SNAP_CATEGORY_LABELS } from '../../constants';
import { useDispatch, useSelector } from '../../hooks';

export const Filter: FunctionComponent = () => {
  const dispatch = useDispatch();
  const all = useSelector(getAll);
  const installed = useSelector(getInstalled);

  const handleClickAll = () => {
    dispatch(filterAll());
  };

  const handleClickInstalled = () => {
    dispatch(toggleInstalled());
  };

  return (
    <>
      <Menu closeOnSelect={false} isLazy={true}>
        <MenuButton as={FilterButton} order={[3, null, 0]} />
        <MenuList width="17.188rem" boxShadow="md">
          <MenuGroup marginLeft="2" title={t`Filter`} data-testid="menu-group">
            <FilterItem checked={all} onClick={handleClickAll}>
              <Text>
                <Trans>All</Trans>
              </Text>
            </FilterItem>
            <FilterItem checked={installed} onClick={handleClickInstalled}>
              <Text>
                <Trans>Installed</Trans>
              </Text>
            </FilterItem>
          </MenuGroup>
          <MenuGroup
            marginLeft="2"
            title={t`Categories`}
            data-testid="menu-group"
          >
            {Object.entries(SNAP_CATEGORY_LABELS).map(
              ([category, { name }]) => (
                <FilterCategory
                  key={name.id}
                  category={category as RegistrySnapCategory}
                  icon={SNAP_CATEGORY_ICONS[category as RegistrySnapCategory]}
                />
              ),
            )}
          </MenuGroup>
          <MenuGroup marginLeft="2" title={t`Sort`}>
            {Object.values(Order)
              .filter(
                (order) =>
                  order !== Order.Random && order !== Order.DeterministicRandom,
              )
              .map((order) => (
                <FilterOrder key={order} order={order} />
              ))}
          </MenuGroup>
        </MenuList>
      </Menu>
      <FilterTags display={['none', null, 'flex']} />
      <FilterSearch />
    </>
  );
};
