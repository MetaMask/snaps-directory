import {
  Menu,
  MenuButton,
  MenuGroup,
  MenuList,
  Text,
  Stack,
} from '@chakra-ui/react';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import type { FunctionComponent } from 'react';

import {
  FilterButton,
  FilterCategory,
  FilterItem,
  FilterTags,
} from './components';
import { FilterOrder } from './components/FilterOrder';
import { Order, SNAP_CATEGORY_ICONS } from './constants';
import { filterAll, getAll, getInstalled, toggleInstalled } from './store';
import type { RegistrySnapCategory } from '../../constants';
import { SNAP_CATEGORY_LABELS } from '../../constants';
import { useDispatch, useSelector } from '../../hooks';

/**
 * Get a subset of the Order enum, excluding the given values.
 *
 * @param excluded - The values to exclude.
 * @returns The subset of the Order enum.
 */
function getOrders<Excluded extends Order>(
  excluded: Excluded[],
): Exclude<Order, Excluded>[] {
  return Object.values(Order).filter(
    (order) => !excluded.includes(order as Excluded),
  ) as Exclude<Order, Excluded>[];
}

export const Filter: FunctionComponent = () => {
  const { _ } = useLingui();
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
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <Menu closeOnSelect={false} isLazy={true}>
        <MenuButton as={FilterButton} />
        <MenuList width="17.188rem" boxShadow="md">
          <MenuGroup
            marginLeft="2"
            title={_(t`Filter`)}
            data-testid="menu-group"
          >
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
            title={_(t`Categories`)}
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
          <MenuGroup marginLeft="2" title={_(t`Sort`)}>
            {getOrders([
              Order.Random,
              Order.DeterministicRandom,
              Order.Search,
            ]).map((order) => (
              <FilterOrder key={order} order={order} />
            ))}
          </MenuGroup>
        </MenuList>
      </Menu>
      <FilterTags />
    </Stack>
  );
};
