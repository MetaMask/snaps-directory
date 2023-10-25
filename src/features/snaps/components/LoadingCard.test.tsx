import { render } from '../../../utils/test-utils';
import { LoadingCard } from './LoadingCard';

describe('LoadingCard', () => {
  it('renders', () => {
    const { queryByTestId } = render(<LoadingCard />);
    expect(queryByTestId('loading-card')).toBeInTheDocument();
  });
});
