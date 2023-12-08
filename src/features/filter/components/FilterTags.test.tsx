import { expect } from '@jest/globals';
import { act } from '@testing-library/react';

import { FilterTags } from './FilterTags';
import { RegistrySnapCategory } from '../../../constants';
import { createStore } from '../../../store';
import { render } from '../../../utils/test-utils';
import { setCategory, toggleInstalled } from '../store';

describe('FilterTags', () => {
  it('renders the selected filters', async () => {
    const store = createStore();
    store.dispatch(setCategory(RegistrySnapCategory.TransactionInsights));

    const { queryByText } = render(<FilterTags />, store);
    expect(queryByText('Security')).toBeInTheDocument();
    expect(queryByText('Interoperability')).not.toBeInTheDocument();
    expect(queryByText('Communication')).not.toBeInTheDocument();
    expect(queryByText('Installed')).not.toBeInTheDocument();

    await act(() =>
      store.dispatch(setCategory(RegistrySnapCategory.Interoperability)),
    );

    expect(queryByText('Security')).not.toBeInTheDocument();
    expect(queryByText('Interoperability')).toBeInTheDocument();

    await act(() => store.dispatch(toggleInstalled()));

    expect(queryByText('Installed')).toBeInTheDocument();
  });

  it('disables the installed filter when clicked', () => {
    const store = createStore();
    store.dispatch(toggleInstalled());

    const { getByTestId, queryByText } = render(<FilterTags />, store);

    const button = getByTestId('filter-installed-close');
    act(() => button.click());

    expect(queryByText('Installed')).not.toBeInTheDocument();
  });
});
