import { Text } from '@chakra-ui/react';
import { act } from '@testing-library/react';
import { useStaticQuery } from 'gatsby';

import { Layout } from './Layout';
import { getMock, render } from '../utils/test-utils';

describe('Layout', () => {
  it('renders the children', async () => {
    const mock = getMock(useStaticQuery);
    mock.mockReturnValue({
      fusejs: {},
    });

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
