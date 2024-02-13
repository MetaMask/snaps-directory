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

  it('renders a known name with additional URLs', () => {
    const { queryByText } = render(
      <SourceCode
        url="https://github.com"
        additionalUrls={[
          { name: 'Foo', url: 'https://gitlab.com' },
          { name: 'Bar', url: 'https://bitbucket.org' },
        ]}
      />,
    );

    expect(queryByText('Main (GitHub)')).toBeInTheDocument();
    expect(queryByText('Foo (GitLab)')).toBeInTheDocument();
    expect(queryByText('Bar (Bitbucket)')).toBeInTheDocument();
  });
});
