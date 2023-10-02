import { ExternalLink } from './ExternalLink';
import { render } from '../utils/test-utils';

describe('ExternalLink', () => {
  it('renders', () => {
    const { queryByText, queryByLabelText } = render(
      <ExternalLink href="https://example.com">Example</ExternalLink>,
    );

    expect(queryByText('Example')).toBeInTheDocument();
    expect(queryByLabelText('External link')).toBeInTheDocument();
  });
});
