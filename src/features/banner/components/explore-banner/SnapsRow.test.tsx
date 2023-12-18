import { SnapsRow } from './SnapsRow';
import { getMockSnap, render } from '../../../../utils/test-utils';

describe('SnapsRow', () => {
  it('renders the Snaps', () => {
    const { snap } = getMockSnap();
    const { getByTestId } = render(<SnapsRow snaps={[snap]} />);

    expect(getByTestId('snaps-row')).toBeInTheDocument();
  });
});
