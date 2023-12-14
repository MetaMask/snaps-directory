import { MetadataItems } from './MetadataItems';
import { render } from '../../../utils/test-utils';

describe('MetadataItems', () => {
  it('renders the developer', () => {
    const { queryByText } = render(
      <MetadataItems
        snap={{
          snapId: 'foo',
          website: 'example.com',
          author: { name: 'Jane Doe', website: 'https://example.com' },
        }}
      />,
    );

    expect(queryByText('Jane Doe')).toBeInTheDocument();
  });

  it('renders the identifier', () => {
    const { queryByText } = render(
      <MetadataItems
        snap={{
          snapId: 'foo',
          website: 'example.com',
          author: { name: 'Jane Doe', website: 'https://example.com' },
        }}
      />,
    );

    expect(queryByText('foo')).toBeInTheDocument();
  });
});
