import { expect } from '@jest/globals';
import { act } from '@testing-library/react';

import { Filter } from './Filter';
import { setCategory, toggleInstalled } from './store';
import { RegistrySnapCategory } from '../../constants';
import { createStore } from '../../store';
import { render } from '../../utils/test-utils';

describe('Filter', () => {
  it('renders the enabled categories', async () => {
    const store = createStore();
    store.dispatch(setCategory(RegistrySnapCategory.TransactionInsights));

    const { queryByText } = render(<Filter />, store);
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

  it('renders the menu on click', () => {
    const { getByLabelText, queryByTestId, queryAllByTestId } = render(
      <Filter />,
    );
    expect(queryByTestId('menu-group')).not.toBeInTheDocument();

    const button = getByLabelText('Open filter menu');
    act(() => button.click());

    expect(queryAllByTestId('menu-group')).toHaveLength(2);
  });

  it('enables all categories and disabled installed when clicking "All"', () => {
    const store = createStore();
    store.dispatch(toggleInstalled());
    store.dispatch(setCategory(RegistrySnapCategory.TransactionInsights));

    const { queryByText, getByText, getByLabelText } = render(
      <Filter />,
      store,
    );

    expect(queryByText('Installed')).toBeInTheDocument();
    expect(queryByText('Security')).toBeInTheDocument();
    expect(queryByText('Interoperability')).not.toBeInTheDocument();
    expect(queryByText('Communication')).not.toBeInTheDocument();

    const button = getByLabelText('Open filter menu');
    act(() => button.click());

    const all = getByText('All');
    act(() => all.click());
    act(() => button.click());

    expect(queryByText('Security')).toBeInTheDocument();
    expect(queryByText('Interoperability')).toBeInTheDocument();
    expect(queryByText('Communication')).toBeInTheDocument();
    expect(queryByText('Installed')).not.toBeInTheDocument();
  });

  it('enables the installed filter when clicking "Installed"', () => {
    const store = createStore();
    store.dispatch(setCategory(RegistrySnapCategory.TransactionInsights));

    const { queryByText, getByText, getByLabelText } = render(
      <Filter />,
      store,
    );

    expect(queryByText('Security')).toBeInTheDocument();
    expect(queryByText('Interoperability')).not.toBeInTheDocument();
    expect(queryByText('Communication')).not.toBeInTheDocument();
    expect(queryByText('Installed')).not.toBeInTheDocument();

    const button = getByLabelText('Open filter menu');
    act(() => button.click());

    const installed = getByText('Installed');
    act(() => installed.click());
    act(() => button.click());

    expect(queryByText('Security')).toBeInTheDocument();
    expect(queryByText('Interoperability')).toBeInTheDocument();
    expect(queryByText('Communication')).toBeInTheDocument();
    expect(queryByText('Installed')).toBeInTheDocument();
  });
});
