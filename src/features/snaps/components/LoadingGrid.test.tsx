import { render } from '../../../utils/test-utils';
import { LoadingGrid } from './LoadingGrid';

describe('LoadingGrid', () => {
  it('renders six loading cards', () => {
    const { queryAllByTestId } = render(<LoadingGrid />);

    expect(queryAllByTestId('loading-card')).toHaveLength(6);
  });
});
