import { SourceCode } from './SourceCode';
import { render } from '../../../utils/test-utils';

describe('SourceCode', () => {
  it('renders the host', () => {
    const { queryByText } = render(<SourceCode url="https://example.com" />);

    expect(queryByText('example.com')).toBeInTheDocument();
  });

  it('renders a known name', () => {
    const { queryByText } = render(<SourceCode url="https://github.com" />);

    expect(queryByText('GitHub')).toBeInTheDocument();
  });
});
