import { act } from '@testing-library/react';

import { SnapAuthorship } from './SnapAuthorship';
import { getMockSnap, render } from '../utils/test-utils';

describe('SnapAuthorship', () => {
  it('renders', async () => {
    const { snap } = getMockSnap();
    const { queryByText } = await act(() =>
      render(<SnapAuthorship {...snap} />),
    );

    expect(queryByText(snap.name)).toBeInTheDocument();
  });
});
