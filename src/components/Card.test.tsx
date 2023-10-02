import { Text } from '@chakra-ui/react';

import { Card } from './Card';
import { render } from '../utils/test-utils';

describe('Card', () => {
  it('renders the children', () => {
    const { queryByText } = render(
      <Card>
        <Text>Foo</Text>
      </Card>,
    );

    expect(queryByText('Foo')).toBeInTheDocument();
  });
});
