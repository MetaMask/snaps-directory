import { Text } from '@chakra-ui/react';

import { Layout } from './Layout';
import { render } from '../utils/test-utils';

describe('Layout', () => {
  it('renders the children', () => {
    const { queryByText } = render(
      <Layout>
        <Text>Foo</Text>
      </Layout>,
    );

    expect(queryByText('Foo')).toBeInTheDocument();
  });
});
