import { Footer } from './Footer';
import { render } from '../utils/test-utils';

describe('Footer', () => {
  it('renders', () => {
    const { queryByText } = render(<Footer />);

    expect(
      queryByText(
        'Start exploring blockchain applications in seconds. Trusted by over 30 million users worldwide.',
      ),
    ).toBeInTheDocument();
  });

  it('renders account management terms', () => {
    const { queryByText } = render(<Footer isAccountManagement={true} />);

    expect(queryByText('Experimental Beta')).toBeInTheDocument();
  });
});
