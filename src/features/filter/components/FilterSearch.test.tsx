import { act, fireEvent } from '@testing-library/react';
import Fuse from 'fuse.js';
import { useStaticQuery } from 'gatsby';

import { FilterSearch } from './FilterSearch';
import { createStore } from '../../../store';
import { getMock, getMockSnap, render } from '../../../utils/test-utils';
import { getSearchQuery } from '../store';

describe('FilterSearch', () => {
  it('renders', () => {
    const mock = getMock(useStaticQuery);
    mock.mockReturnValue({
      fusejs: {},
    });

    const { getByPlaceholderText } = render(<FilterSearch />);

    expect(getByPlaceholderText('Search Snaps')).toBeInTheDocument();
  });

  it('renders a menu with the search results', async () => {
    const fooSnap = getMockSnap({ snapId: 'foo-snap', name: 'foo-snap' }).snap;
    const barSnap = getMockSnap({ snapId: 'bar-snap', name: 'bar-snap' }).snap;

    const data = [fooSnap, barSnap];
    const fuse = new Fuse(data, {
      keys: ['snapId'],
    });

    const index = JSON.stringify(fuse.getIndex());

    const mock = getMock(useStaticQuery);
    mock.mockReturnValue({
      fusejs: {
        index,
        data,
      },
    });

    const store = createStore({
      snaps: {
        snaps: [fooSnap, barSnap],
      },
    });

    const { getByPlaceholderText, queryByText } = render(
      <FilterSearch />,
      store,
    );

    const input = getByPlaceholderText('Search Snaps');
    await act(() => fireEvent.change(input, { target: { value: 'foo-snap' } }));

    expect(queryByText('foo-snap')).toBeInTheDocument();
  });

  it('sets the search query and results when clicking "See all results"', async () => {
    const fooSnap = getMockSnap({ snapId: 'foo-snap', name: 'foo-snap' }).snap;
    const barSnap = getMockSnap({ snapId: 'bar-snap', name: 'bar-snap' }).snap;

    const data = [fooSnap, barSnap];
    const fuse = new Fuse(data, {
      keys: ['snapId'],
    });

    const index = JSON.stringify(fuse.getIndex());

    const mock = getMock(useStaticQuery);
    mock.mockReturnValue({
      fusejs: {
        index,
        data,
      },
    });

    const store = createStore({
      snaps: {
        snaps: [fooSnap, barSnap],
      },
    });

    const { getByPlaceholderText, getByText } = render(<FilterSearch />, store);

    const input = getByPlaceholderText('Search Snaps');
    fireEvent.change(input, { target: { value: 'foo' } });

    const seeAllResults = getByText('See all results');
    await act(() => fireEvent.click(seeAllResults));

    expect(getSearchQuery(store.getState())).toBe('foo');
    expect(store.getState().filter.searchResults).toStrictEqual([fooSnap]);
  });
});
