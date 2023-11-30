import { describe } from '@jest/globals';
import { act } from '@testing-library/react';

import { FilteredSnaps } from './FilteredSnaps';
import { setSnaps } from './store';
import { RegistrySnapCategory } from '../../constants';
import { createStore } from '../../store';
import { getMockSnap, render } from '../../utils/test-utils';

describe('FilteredSnaps', () => {
  it('renders', async () => {
    const { snap: fooSnap } = getMockSnap({
      snapId: 'foo-snap',
      name: 'Foo Snap',
    });
    const { snap: barSnap } = getMockSnap({
      snapId: 'bar-snap',
      name: 'Bar Snap',
    });
    const { snap: bazSnap } = getMockSnap({
      snapId: 'baz-snap',
      name: 'Baz Snap',
    });

    const store = createStore();
    store.dispatch(setSnaps([fooSnap, barSnap, bazSnap]));

    const { queryByText } = await act(() => render(<FilteredSnaps />, store));
    expect(queryByText('Foo Snap')).toBeInTheDocument();
    expect(queryByText('Bar Snap')).toBeInTheDocument();
    expect(queryByText('Baz Snap')).toBeInTheDocument();
  });

  it('supports filtering by category', async () => {
    const { snap: fooSnap } = getMockSnap({
      snapId: 'foo-snap',
      name: 'Foo Snap',
      category: RegistrySnapCategory.Interoperability,
    });
    const { snap: barSnap } = getMockSnap({
      snapId: 'bar-snap',
      name: 'Bar Snap',
    });
    const { snap: bazSnap } = getMockSnap({
      snapId: 'baz-snap',
      name: 'Baz Snap',
    });

    const store = createStore();
    store.dispatch(setSnaps([fooSnap, barSnap, bazSnap]));

    const { queryByText } = await act(() =>
      render(
        <FilteredSnaps category={RegistrySnapCategory.Interoperability} />,
        store,
      ),
    );
    expect(queryByText('Foo Snap')).toBeInTheDocument();
    expect(queryByText('Bar Snap')).not.toBeInTheDocument();
    expect(queryByText('Baz Snap')).not.toBeInTheDocument();
  });
});
