import { MetaMaskLogo } from './MetaMaskLogo';
import { createStore } from '../store';
import { render } from '../utils/test-utils';

describe('MetaMaskLogo', () => {
  it('renders the logo', () => {
    const { queryByLabelText } = render(<MetaMaskLogo />, createStore(), {
      colorMode: 'light',
    });

    expect(queryByLabelText('MetaMask')).toBeInTheDocument();
  });
});
