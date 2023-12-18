import { fireEvent } from '@testing-library/react';

import { Navigation } from './Navigation';
import { render } from '../../../utils/test-utils';

describe('Navigation', () => {
  it('renders the navigation buttons', () => {
    const { queryByTestId } = render(
      <Navigation current={0} items={3} onChange={jest.fn()} />,
    );

    expect(queryByTestId('navigation-0')).toBeInTheDocument();
    expect(queryByTestId('navigation-1')).toBeInTheDocument();
    expect(queryByTestId('navigation-2')).toBeInTheDocument();
  });

  it('calls the onChange callback when a button is clicked', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <Navigation current={0} items={3} onChange={onChange} />,
    );

    const button = getByTestId('navigation-1');
    fireEvent.click(button);

    expect(onChange).toHaveBeenCalledWith(1);
  });
});
