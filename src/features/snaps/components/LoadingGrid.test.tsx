import { LoadingGrid } from './LoadingGrid';
import { render } from '../../../utils/test-utils';

describe('LoadingGrid', () => {
  it('renders six loading cards', () => {
    const { queryAllByTestId } = render(<LoadingGrid />);

    expect(queryAllByTestId('loading-card')).toHaveLength(6);
  });
});
