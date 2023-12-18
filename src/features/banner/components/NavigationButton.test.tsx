import { fireEvent } from '@testing-library/react';

import { NavigationButton } from './NavigationButton';
import { render } from '../../../utils/test-utils';

describe('NavigationButton', () => {
  it('renders the navigation buttons', () => {
    const { queryByTestId } = render(
      <NavigationButton index={0} current={false} onChange={jest.fn()} />,
    );

    expect(queryByTestId('navigation-button-0')).toBeInTheDocument();
  });

  it('calls the onChange callback when a button is clicked', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(
      <NavigationButton index={0} current={true} onChange={onChange} />,
    );

    const button = getByTestId('navigation-button-0');
    fireEvent.click(button);

    expect(onChange).toHaveBeenCalledWith(0);
  });
});
