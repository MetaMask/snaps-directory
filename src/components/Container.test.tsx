import { Text } from '@chakra-ui/react';

import { render } from '../utils/test-utils';
import { Container } from './Container';

describe('Container', () => {
  it('renders the children', () => {
    const { queryByText } = render(
      <Container>
        <Text>Foo</Text>
      </Container>,
    );

    expect(queryByText('Foo')).toBeInTheDocument();
  });
});
