import { render } from '../utils/test-utils';
import { FooterCopyright } from './FooterCopyright';

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
