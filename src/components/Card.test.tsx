import { Text } from '@chakra-ui/react';

import { render } from '../utils/test-utils';
import { Card } from './Card';

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
