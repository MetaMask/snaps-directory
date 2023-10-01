import { Header } from './Header';
import { render } from '../utils/test-utils';

describe('Header', () => {
  it('renders', () => {
    const { queryByLabelText } = render(<Header />);

    expect(queryByLabelText('MetaMask Snaps Directory')).toBeInTheDocument();
  });
});
