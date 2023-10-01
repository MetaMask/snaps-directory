import { act } from '@testing-library/react';

import { NoSnaps } from './NoSnaps';
import { createStore } from '../../../store';
import { render } from '../../../utils/test-utils';
import {
  getInstalled,
  getSearchQuery,
  setSearchQuery,
  toggleInstalled,
} from '../../filter';

describe('NoSnaps', () => {
  it('renders', () => {
    const { queryByText } = render(<NoSnaps />);

    expect(queryByText('No Snaps found')).toBeInTheDocument();
  });

  it('clears the filter and search when the button is clicked', () => {
    const store = createStore();
    const { getByText } = render(<NoSnaps />, store);

    store.dispatch(setSearchQuery('foo'));
    store.dispatch(toggleInstalled());

    const button = getByText('See everything');
    act(() => button.click());

    expect(getSearchQuery(store.getState())).toBe('');
    expect(getInstalled(store.getState())).toBe(false);
  });
});
