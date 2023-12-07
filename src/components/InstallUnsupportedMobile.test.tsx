import { act } from '@testing-library/react';

import { InstallUnsupportedMobile } from './InstallUnsupportedMobile';
import { render } from '../utils/test-utils';

describe('InstallUnsupportedMobile', () => {
  it('renders a drawer when open', async () => {
    const { queryByText } = await act(() =>
      render(<InstallUnsupportedMobile isOpen={true} onClose={jest.fn()} />),
    );

    expect(queryByText('Available on desktop')).toBeInTheDocument();
  });
});
