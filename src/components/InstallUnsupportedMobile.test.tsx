import { act } from '@testing-library/react';

import { render } from '../utils/test-utils';
import { InstallUnsupportedMobile } from './InstallUnsupportedMobile';

describe('InstallUnsupportedMobile', () => {
  it('renders a drawer when open', async () => {
    const { queryByText } = await act(() =>
      render(<InstallUnsupportedMobile isOpen={true} onClose={jest.fn()} />),
    );

    expect(queryByText('Desktop only')).toBeInTheDocument();
  });
});
