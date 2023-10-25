import { Menu } from '@chakra-ui/react';
import { act } from '@testing-library/react';

import { createStore } from '../../../store';
import { render } from '../../../utils/test-utils';
import { Order } from '../constants';
import { getOrder } from '../store';
import { FilterOrder } from './FilterOrder';

describe('FilterOrder', () => {
  it('renders', () => {
    const { queryByText } = render(
      <Menu>
        <FilterOrder order={Order.Random} />
      </Menu>,
    );

    expect(queryByText('Random')).toBeInTheDocument();
  });

  it('sets the order when clicked', () => {
    const store = createStore();
    const { getByText } = render(
      <Menu>
        <FilterOrder order={Order.Alphabetical} />
      </Menu>,
      store,
    );

    expect(getOrder(store.getState())).toBe(Order.Random);

    const button = getByText('Alphabetical');
    act(() => button.click());

    expect(getOrder(store.getState())).toBe(Order.Alphabetical);
  });
});
