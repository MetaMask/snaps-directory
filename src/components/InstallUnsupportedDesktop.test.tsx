import { act } from '@testing-library/react';

import { render } from '../utils/test-utils';
import { InstallUnsupportedDesktop } from './InstallUnsupportedDesktop';

describe('InstallUnsupportedDesktop', () => {
  it('renders a modal when open', async () => {
    const { queryByText } = await act(() =>
      render(<InstallUnsupportedDesktop isOpen={true} onClose={jest.fn()} />),
    );

    expect(queryByText('Install MetaMask')).toBeInTheDocument();
  });
});
