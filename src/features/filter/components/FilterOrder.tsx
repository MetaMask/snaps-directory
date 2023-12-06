import { Text } from '@chakra-ui/react';
import { useLingui } from '@lingui/react';
import type { FunctionComponent } from 'react';

import { FilterItem } from './FilterItem';
import { useDispatch, useSelector } from '../../../hooks';
import type { Order } from '../constants';
import { SNAP_ORDER_LABELS } from '../constants';
import { getOrder, setOrder } from '../store';

export type FilterOrderProps = {
  order: Order.Popularity | Order.Alphabetical | Order.Latest;
};

export const FilterOrder: FunctionComponent<FilterOrderProps> = ({ order }) => {
  const i18n = useLingui();
  const dispatch = useDispatch();
  const currentOrder = useSelector(getOrder);

  const handleClick = () => {
    dispatch(setOrder(order));
  };

  return (
    <FilterItem checked={currentOrder === order} onClick={handleClick}>
      <Text>{i18n._(SNAP_ORDER_LABELS[order])}</Text>
    </FilterItem>
  );
};
