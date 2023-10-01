import { Logo } from './Logo';
import { createStore } from '../store';
import { render } from '../utils/test-utils';

describe('Logo', () => {
  it('renders the logo with the correct fill color', async () => {
    const { queryByLabelText } = render(<Logo />, createStore(), {
      colorMode: 'dark',
    });

    expect(queryByLabelText('MetaMask Snaps Directory')).toHaveAttribute(
      'fill',
      'white',
    );
  });

  it('renders the logo', () => {
    const { queryByLabelText } = render(<Logo />, createStore(), {
      colorMode: 'light',
    });

    expect(queryByLabelText('MetaMask Snaps Directory')).toBeInTheDocument();
  });
});
