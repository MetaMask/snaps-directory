import { MetaMaskLogo } from './MetaMaskLogo';
import { createStore } from '../store';
import { render } from '../utils/test-utils';

describe('MetaMaskLogo', () => {
  it('renders the logo with the correct fill color', async () => {
    const { queryByLabelText } = render(<MetaMaskLogo />, createStore(), {
      colorMode: 'dark',
    });

    expect(queryByLabelText('MetaMask')).toHaveAttribute('fill', 'white');
  });

  it('renders the logo', () => {
    const { queryByLabelText } = render(<MetaMaskLogo />, createStore(), {
      colorMode: 'light',
    });

    expect(queryByLabelText('MetaMask')).toBeInTheDocument();
  });
});
