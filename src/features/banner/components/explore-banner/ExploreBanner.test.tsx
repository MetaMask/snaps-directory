import { ExploreBanner } from './ExploreBanner';
import { getMockSnap, render } from '../../../../utils/test-utils';

describe('ExploreBanner', () => {
  it('renders the banner', () => {
    const { queryByText } = render(<ExploreBanner snaps={[]} />);

    expect(queryByText('Open Beta Live')).toBeInTheDocument();
  });

  it('renders the Snaps', () => {
    const { snap } = getMockSnap();
    const { queryAllByTestId } = render(<ExploreBanner snaps={[snap]} />);

    expect(queryAllByTestId('snaps-row')).toHaveLength(3);
  });
});
