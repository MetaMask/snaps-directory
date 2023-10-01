import { BackButton } from './BackButton';
import { render } from '../utils/test-utils';

describe('BackButton', () => {
  it('renders', () => {
    const { queryByText } = render(<BackButton />);

    expect(queryByText('Discover Snaps')).toBeInTheDocument();
  });
});
