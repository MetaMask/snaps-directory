import { act } from '@testing-library/react';
import { useStaticQuery } from 'gatsby';

import { Header } from './Header';
import { getMock, render } from '../utils/test-utils';

describe('Header', () => {
  it('renders', async () => {
    const mock = getMock(useStaticQuery);
    mock.mockReturnValue({
      fusejs: {},
    });

    const { queryByPlaceholderText } = await act(
      async () => await act(() => render(<Header />)),
    );

    expect(queryByPlaceholderText('Search Snaps')).toBeInTheDocument();
  });
});
