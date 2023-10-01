import { act } from '@testing-library/react';

import { InstallUnsupportedDesktopUpdate } from './InstallUnsupportedDesktopUpdate';
import { render } from '../utils/test-utils';

describe('InstallUnsupportedDesktopUpdate', () => {
  it('renders a modal when open', async () => {
    const { queryByText } = await act(() =>
      render(<InstallUnsupportedDesktopUpdate onClose={jest.fn()} />),
    );

    expect(queryByText('Update required')).toBeInTheDocument();
  });
});
