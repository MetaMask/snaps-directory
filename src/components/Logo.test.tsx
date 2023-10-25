import { createStore } from '../store';
import { render } from '../utils/test-utils';
import { Logo } from './Logo';

describe('Logo', () => {
  it('renders the logo with the correct fill color', async () => {
    const { queryAllByLabelText } = render(<Logo />, createStore(), {
      colorMode: 'dark',
    });

    expect(queryAllByLabelText('MetaMask Snaps Directory')).toHaveLength(2);
  });

  it('renders the logo', () => {
    const { queryAllByLabelText } = render(<Logo />, createStore(), {
      colorMode: 'light',
    });

    expect(queryAllByLabelText('MetaMask Snaps Directory')).toHaveLength(2);
  });
});
