import { Text } from '@chakra-ui/react';

import { Container } from './Container';
import { render } from '../utils/test-utils';

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
