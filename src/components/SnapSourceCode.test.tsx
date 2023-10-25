import { render } from '../utils/test-utils';
import { SnapSourceCode } from './SnapSourceCode';

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
