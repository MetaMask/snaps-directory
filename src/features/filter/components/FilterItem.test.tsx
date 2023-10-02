import { Menu, Text } from '@chakra-ui/react';

import { FilterItem } from './FilterItem';
import { render } from '../../../utils/test-utils';

describe('FilterItem', () => {
  it('renders', () => {
    const { queryByText, queryByLabelText } = render(
      <Menu>
        <FilterItem checked={false}>
          <Text>Foo</Text>
        </FilterItem>
      </Menu>,
    );

    expect(queryByText('Foo')).toBeInTheDocument();

    const check = queryByLabelText('Check');
    expect(check).toBeInTheDocument();
    expect(check).toHaveStyle({
      visibility: 'hidden',
    });
  });

  it('renders with a check icon when checked', () => {
    const { queryByLabelText } = render(
      <Menu>
        <FilterItem checked={true}>
          <Text>Foo</Text>
        </FilterItem>
      </Menu>,
    );

    const check = queryByLabelText('Check');
    expect(check).toBeInTheDocument();
    expect(check).toHaveStyle({
      visibility: 'initial',
    });
  });
});
