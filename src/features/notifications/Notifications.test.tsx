import { act } from '@testing-library/react';

import { Notifications } from './Notifications';
import { render } from '../../utils/test-utils';

describe('Notifications', () => {
  it('renders a menu', async () => {
    const { queryByLabelText } = await act(
      async () => await act(() => render(<Notifications />)),
    );

    expect(queryByLabelText('Open notifications menu')).toBeInTheDocument();
  });

  it('opens the menu when clicked', async () => {
    const { getByLabelText, queryByText } = await act(
      async () => await act(() => render(<Notifications />)),
    );

    const button = getByLabelText('Open notifications menu');
    act(() => button?.click());

    expect(queryByText('No updates')).toBeInTheDocument();
  });
});
