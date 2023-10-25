import { act } from '@testing-library/react';

import { RegistrySnapCategory } from '../../../constants';
import { createStore } from '../../../store';
import { render } from '../../../utils/test-utils';
import { getCategory } from '../store';
import { FilterTag } from './FilterTag';

describe('FilterTag', () => {
  it('renders', () => {
    const { queryByText } = render(
      <FilterTag category={RegistrySnapCategory.TransactionInsights} />,
    );

    expect(queryByText('Transaction Insights')).toBeInTheDocument();
  });

  it('toggles the category when clicked', () => {
    const store = createStore();
    const { getByLabelText } = render(
      <FilterTag category={RegistrySnapCategory.TransactionInsights} />,
      store,
    );

    expect(
      getCategory(RegistrySnapCategory.TransactionInsights)(store.getState()),
    ).toBe(true);

    const button = getByLabelText('Close').parentElement;
    act(() => button?.click());

    expect(
      getCategory(RegistrySnapCategory.TransactionInsights)(store.getState()),
    ).toBe(false);
  });
});
