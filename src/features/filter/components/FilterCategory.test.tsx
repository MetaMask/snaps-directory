import { Menu } from '@chakra-ui/react';
import { expect } from '@jest/globals';
import { act } from '@testing-library/react';

import { TransactionInsightsIcon } from '../../../components';
import { RegistrySnapCategory } from '../../../constants';
import { createStore } from '../../../store';
import { render } from '../../../utils/test-utils';
import { getCategory } from '../store';
import { FilterCategory } from './FilterCategory';

describe('FilterCategory', () => {
  it('renders', () => {
    const { queryByText, queryByLabelText } = render(
      <Menu>
        <FilterCategory
          category={RegistrySnapCategory.TransactionInsights}
          icon={TransactionInsightsIcon}
        />
      </Menu>,
    );

    expect(queryByText('Transaction Insights')).toBeInTheDocument();
    expect(queryByLabelText('Transaction insights')).toBeInTheDocument();
  });

  it('toggles the category when clicked', () => {
    const store = createStore();
    const { getByText } = render(
      <Menu>
        <FilterCategory
          category={RegistrySnapCategory.TransactionInsights}
          icon={TransactionInsightsIcon}
        />
      </Menu>,
      store,
    );

    expect(
      getCategory(RegistrySnapCategory.TransactionInsights)(store.getState()),
    ).toBe(true);

    const button = getByText('Transaction Insights');
    act(() => button.click());

    expect(
      getCategory(RegistrySnapCategory.TransactionInsights)(store.getState()),
    ).toBe(false);
  });
});
