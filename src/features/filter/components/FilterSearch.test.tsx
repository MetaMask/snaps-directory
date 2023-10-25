import { fireEvent } from '@testing-library/react';
import Fuse from 'fuse.js';
import { useStaticQuery } from 'gatsby';

import { createStore } from '../../../store';
import { getMock, getMockSnap, render } from '../../../utils/test-utils';
import { getSearchQuery } from '../store';
import { FilterSearch } from './FilterSearch';

describe('FilterSearch', () => {
  it('renders', () => {
    const mock = getMock(useStaticQuery);
    mock.mockReturnValue({
      fusejs: {},
    });

    const { getByPlaceholderText } = render(<FilterSearch />);

    expect(getByPlaceholderText('Search snaps...')).toBeInTheDocument();
  });

  it('sets the search query and results', () => {
    const fooSnap = getMockSnap({ snapId: 'foo-snap' }).snap;
    const barSnap = getMockSnap({ snapId: 'bar-snap' }).snap;

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

    const store = createStore();
    const { getByPlaceholderText } = render(<FilterSearch />, store);

    const input = getByPlaceholderText('Search snaps...');
    fireEvent.change(input, { target: { value: 'foo' } });

    expect(getSearchQuery(store.getState())).toBe('foo');
    expect(store.getState().filter.searchResults).toStrictEqual([
      {
        item: fooSnap,
        refIndex: 0,
      },
    ]);
  });
});
