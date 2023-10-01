import { describe, it, expect } from '@jest/globals';
import { act } from 'react-dom/test-utils';

import { Snaps } from './Snaps';
import { createStore } from '../../store';
import { getMockSnap, render } from '../../utils/test-utils';

describe('Snaps', () => {
  it('renders the loading grid when Snaps are not loaded', () => {
    const { queryByTestId } = render(<Snaps />);
    expect(queryByTestId('loading-grid')).toBeInTheDocument();
  });

  it('renders the no Snaps screen when there are no snaps', async () => {
    // Double `act`, because otherwise we get a warning about an update
    // happening outside of an `act()` call.
    const { queryByTestId } = await act(
      async () =>
        await act(() =>
          render(
            <Snaps />,
            createStore({
              snaps: {
                snaps: [],
              },
            }),
          ),
        ),
    );

    expect(queryByTestId('no-snaps')).toBeInTheDocument();
  });

  it('renders the Snaps', async () => {
    // Double `act`, because otherwise we get a warning about an update
    // happening outside of an `act()` call.
    const { queryByText } = await act(
      async () =>
        await act(() =>
          render(
            <Snaps />,
            createStore({
              snaps: {
                snaps: [
                  getMockSnap({ id: 'foo', name: 'Foo Snap' }).snap,
                  getMockSnap({ id: 'bar', name: 'Bar Snap' }).snap,
                ],
              },
            }),
          ),
        ),
    );

    expect(queryByText('Foo Snap')).toBeInTheDocument();
    expect(queryByText('Bar Snap')).toBeInTheDocument();
  });
});
