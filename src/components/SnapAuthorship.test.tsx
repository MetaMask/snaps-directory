import { act } from '@testing-library/react';

import { getMockSnap, render } from '../utils/test-utils';
import { SnapAuthorship } from './SnapAuthorship';

describe('SnapAuthorship', () => {
  it('renders', async () => {
    const { snap } = getMockSnap();
    const { queryByText } = await act(() =>
      render(<SnapAuthorship {...snap} />),
    );

    expect(queryByText(snap.name)).toBeInTheDocument();
  });
});
