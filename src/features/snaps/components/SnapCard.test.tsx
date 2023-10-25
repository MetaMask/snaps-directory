import { act } from '@testing-library/react';

import { getMockSnap, render } from '../../../utils/test-utils';
import { SnapCard } from './SnapCard';

describe('SnapCard', () => {
  it('renders', async () => {
    const { snap } = getMockSnap();
    const { queryByText } = await act(() => render(<SnapCard {...snap} />));

    expect(queryByText(snap.name)).toBeInTheDocument();
    expect(queryByText(snap.summary)).toBeInTheDocument();
  });
});
