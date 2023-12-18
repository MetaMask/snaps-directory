import { Link } from './Link';
import { render } from '../utils/test-utils';

describe('Link', () => {
  it('renders an external link', () => {
    const { queryByText } = render(
      <Link to="https://example.com" external>
        Example
      </Link>,
    );

    expect(queryByText('Example')).toBeInTheDocument();
  });

  it('renders an internal link', () => {
    const { queryByText } = render(<Link to="/example">Example</Link>);

    expect(queryByText('Example')).toBeInTheDocument();
  });
});
