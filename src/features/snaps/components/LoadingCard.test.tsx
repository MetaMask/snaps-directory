import { LoadingCard } from './LoadingCard';
import { render } from '../../../utils/test-utils';

describe('LoadingCard', () => {
  it('renders', () => {
    const { queryByTestId } = render(<LoadingCard />);
    expect(queryByTestId('loading-card')).toBeInTheDocument();
  });
});
