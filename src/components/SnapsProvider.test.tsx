import { Text } from '@chakra-ui/react';
import { useStaticQuery } from 'gatsby';

import { SnapsProvider } from './SnapsProvider';
import { createStore } from '../store';
import { getMock, getMockSnap, render } from '../utils/test-utils';

describe('SnapsProvider', () => {
  it('renders children', () => {
    const mock = getMock(useStaticQuery);
    mock.mockReturnValue({
      allSnap: {
        nodes: [],
      },
    });

    const { queryByText } = render(
      <SnapsProvider store={createStore()}>
        <Text>Foo</Text>
      </SnapsProvider>,
    );

    expect(queryByText('Foo')).toBeInTheDocument();
  });

  it('sets the Snaps in the store', () => {
    const { snap: fooSnap } = getMockSnap({ snapId: 'foo-snap' });
    const { snap: barSnap } = getMockSnap({ snapId: 'bar-snap' });
    const { snap: bazSnap } = getMockSnap({ snapId: 'baz-snap' });

    const mock = getMock(useStaticQuery);
    mock.mockReturnValue({
      allSnap: {
        nodes: [fooSnap, barSnap, bazSnap],
      },
    });

    const store = createStore();
    render(<SnapsProvider store={store} />);

    expect(store.getState().snaps.snaps).toContainEqual(fooSnap);
    expect(store.getState().snaps.snaps).toContainEqual(barSnap);
    expect(store.getState().snaps.snaps).toContainEqual(bazSnap);
  });
});
