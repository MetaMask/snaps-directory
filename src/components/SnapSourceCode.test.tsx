import { SnapSourceCode } from './SnapSourceCode';
import { render } from '../utils/test-utils';

describe('SnapSourceCode', () => {
  it('renders the host', () => {
    const { queryByText } = render(
      <SnapSourceCode url="https://example.com" />,
    );

    expect(queryByText('example.com')).toBeInTheDocument();
  });

  it('renders a known name', () => {
    const { queryByText } = render(<SnapSourceCode url="https://github.com" />);

    expect(queryByText('GitHub')).toBeInTheDocument();
  });
});
