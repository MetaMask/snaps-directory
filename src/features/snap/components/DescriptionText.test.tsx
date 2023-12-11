import { DescriptionText } from './DescriptionText';
import { render } from '../../../utils/test-utils';

describe('DescriptionText', () => {
  it('renders links in trusted descriptions', () => {
    const { queryByText } = render(
      <DescriptionText
        description={{
          description: 'This is a link: https://example.com',
          trusted: true,
        }}
      />,
    );

    expect(queryByText('This is a link:')).toBeInTheDocument();
    expect(queryByText('example.com')).toBeInTheDocument();
  });

  it('does not render links in untrusted descriptions', () => {
    const { queryByText } = render(
      <DescriptionText
        description={{
          description: 'This is a link: https://example.com',
          trusted: false,
        }}
      />,
    );

    expect(
      queryByText('This is a link: https://example.com'),
    ).toBeInTheDocument();
    expect(queryByText('example.com')).not.toBeInTheDocument();
  });
});
