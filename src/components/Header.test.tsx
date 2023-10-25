import { act } from '@testing-library/react';

import { render } from '../utils/test-utils';
import { Header } from './Header';

describe('Header', () => {
  it('renders', async () => {
    const { queryByText } = await act(
      async () => await act(() => render(<Header />)),
    );

    expect(queryByText('Open Beta')).toBeInTheDocument();
  });
});
