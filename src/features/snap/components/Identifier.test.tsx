import { Identifier } from './Identifier';
import { getMockSnap, render } from '../../../utils/test-utils';

describe('Identifier', () => {
  it('renders', () => {
    const { snap } = getMockSnap();
    const { queryByText } = render(
      <Identifier snapId={snap.snapId} website={snap.website} />,
    );

    expect(queryByText(snap.snapId)).toBeInTheDocument();
  });
});
