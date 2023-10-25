import { render } from '../utils/test-utils';
import { BackButton } from './BackButton';

describe('BackButton', () => {
  it('renders', () => {
    const { queryByText } = render(<BackButton />);

    expect(queryByText('Discover Snaps')).toBeInTheDocument();
  });
});
