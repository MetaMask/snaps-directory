import { act } from '@testing-library/react';

import { Authorship } from './Authorship';
import { getMockSnap, render } from '../../../utils/test-utils';

describe('Authorship', () => {
  it('renders', async () => {
    const { snap } = getMockSnap();
    const { queryByText } = await act(() => render(<Authorship {...snap} />));

    expect(queryByText(snap.name)).toBeInTheDocument();
  });
});
