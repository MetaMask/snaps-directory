import { render } from '../utils/test-utils';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders', () => {
    const { queryByText } = render(<Footer />);

    expect(
      queryByText(
        'Start exploring blockchain applications in seconds. Trusted by over 30 million users worldwide.',
      ),
    ).toBeInTheDocument();
  });
});
