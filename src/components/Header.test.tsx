import { act } from '@testing-library/react';

import { Header } from './Header';
import { render } from '../utils/test-utils';

describe('Header', () => {
  it('renders', async () => {
    const { queryByPlaceholderText } = await act(
      async () => await act(() => render(<Header />)),
    );

    expect(queryByPlaceholderText('Search Snaps')).toBeInTheDocument();
  });
});
