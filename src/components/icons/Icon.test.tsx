import { render } from '../../utils/test-utils';
import { wrapIcon } from './Icon';
import MetaMaskIcon from './metamask.svg';

describe('wrapIcon', () => {
  it('wraps an SVG icon component', () => {
    const Icon = wrapIcon(MetaMaskIcon, { id: 'metamask' });
    const { getByLabelText } = render(<Icon />);

    expect(getByLabelText('metamask')).toBeInTheDocument();
  });
});
