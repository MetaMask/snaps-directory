import { act } from '@testing-library/react';

import { InstallUnsupportedDesktop } from './InstallUnsupportedDesktop';
import { render } from '../utils/test-utils';

describe('InstallUnsupportedDesktop', () => {
  it('renders a modal when open', async () => {
    const { queryByText } = await act(() =>
      render(<InstallUnsupportedDesktop isOpen={true} onClose={jest.fn()} />),
    );

    expect(queryByText('Install MetaMask')).toBeInTheDocument();
  });
});
