import { FooterCopyright } from './FooterCopyright';
import { render } from '../utils/test-utils';

describe('FooterCopyright', () => {
  it('renders', () => {
    const { queryByText } = render(<FooterCopyright />);

    expect(
      queryByText(
        `©${new Date().getFullYear()} MetaMask. All rights reserved.`,
        { exact: false },
      ),
    ).toBeInTheDocument();
  });
});
