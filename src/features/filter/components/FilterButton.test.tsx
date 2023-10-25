import { render } from '../../../utils/test-utils';
import { FilterButton } from './FilterButton';

describe('FilterButton', () => {
  it('renders', () => {
    const { queryByTestId } = render(<FilterButton />);

    expect(queryByTestId('filter-button')).toBeInTheDocument();
  });
});
