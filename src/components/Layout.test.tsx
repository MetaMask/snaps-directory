import { Text } from '@chakra-ui/react';
import { act } from '@testing-library/react';

import { render } from '../utils/test-utils';
import { Layout } from './Layout';

describe('Layout', () => {
  it('renders the children', async () => {
    const { queryByText } = await act(
      async () =>
        await act(() =>
          render(
            <Layout>
              <Text>Foo</Text>
            </Layout>,
          ),
        ),
    );

    expect(queryByText('Foo')).toBeInTheDocument();
  });
});
