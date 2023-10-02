import { act } from '@testing-library/react';

import { SnapCard } from './SnapCard';
import { getMockSnap, render } from '../../../utils/test-utils';

describe('SnapCard', () => {
  it('renders', async () => {
    const { snap } = getMockSnap();
    const { queryByText } = await act(() => render(<SnapCard {...snap} />));

    expect(queryByText(snap.name)).toBeInTheDocument();
    expect(queryByText(snap.summary)).toBeInTheDocument();
  });
});
