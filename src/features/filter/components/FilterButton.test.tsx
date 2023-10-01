import { FilterButton } from './FilterButton';
import { render } from '../../../utils/test-utils';

describe('FilterButton', () => {
  it('renders', () => {
    const { queryByTestId } = render(<FilterButton />);

    expect(queryByTestId('filter-button')).toBeInTheDocument();
  });
});
