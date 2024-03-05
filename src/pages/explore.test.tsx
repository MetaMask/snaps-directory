import { describe } from '@jest/globals';
import { act } from '@testing-library/react';

import ExplorePage from './explore';
import { RegistrySnapCategory } from '../constants';
import { setCategory, setSearchQuery, setSnaps } from '../features';
import { createStore } from '../store';
import { render, getMockSnap, getMockPageContext } from '../utils/test-utils';

describe('Explore page', () => {
  it('renders', async () => {
    const { queryByText } = render(
      <ExplorePage pageContext={getMockPageContext()} />,
    );
    expect(queryByText('Explore Snaps')).toBeInTheDocument();
  });

  it('renders the search query in the heading', async () => {
    const store = createStore();
    store.dispatch(setSearchQuery('foo'));

    const { queryByText } = render(
      <ExplorePage pageContext={getMockPageContext()} />,
      store,
    );
    expect(queryByText('Results for "foo"')).toBeInTheDocument();
  });

  it('resets filters when see all is clicked', async () => {
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
    store.dispatch(setCategory(RegistrySnapCategory.Interoperability));

    const { queryByText, getByText } = await act(
      async () =>
        await act(() =>
          render(<ExplorePage pageContext={getMockPageContext()} />, store),
        ),
    );

    expect(queryByText('Foo Snap')).toBeInTheDocument();
    expect(queryByText('Bar Snap')).not.toBeInTheDocument();
    expect(queryByText('Baz Snap')).not.toBeInTheDocument();

    const button = getByText('See All');

    await act(async () => act(() => button.click()));

    expect(queryByText('Foo Snap')).toBeInTheDocument();
    expect(queryByText('Bar Snap')).toBeInTheDocument();
    expect(queryByText('Baz Snap')).toBeInTheDocument();
  });
});
