import { Menu } from '@chakra-ui/react';
import { act } from '@testing-library/react';

import { FilterOrder } from './FilterOrder';
import { createStore } from '../../../store';
import { render } from '../../../utils/test-utils';
import { Order } from '../constants';
import { getOrder } from '../store';

describe('FilterOrder', () => {
  it('renders', () => {
    const { queryByText } = render(
      <Menu>
        <FilterOrder order={Order.Popularity} />
      </Menu>,
    );

    expect(queryByText('Most Popular')).toBeInTheDocument();
  });

  it('sets the order when clicked', () => {
    const store = createStore();
    const { getByText } = render(
      <Menu>
        <FilterOrder order={Order.Alphabetical} />
      </Menu>,
      store,
    );

    expect(getOrder(store.getState())).toBe(Order.Popularity);

    const button = getByText('Alphabetical');
    act(() => button.click());

    expect(getOrder(store.getState())).toBe(Order.Alphabetical);
  });
});
