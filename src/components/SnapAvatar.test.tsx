import { act } from '@testing-library/react';

import { SnapAvatar } from './SnapAvatar';
import { getMockSnap, render } from '../utils/test-utils';

describe('SnapAvatar', () => {
  it('renders', async () => {
    const { snap } = getMockSnap({ name: 'Foo Snap' });
    const { queryByText, queryByTestId } = await act(() =>
      render(
        <SnapAvatar
          snapName={snap.name}
          icon={snap.icon}
          isInstalled={false}
        />,
      ),
    );

    expect(queryByText('F')).toBeInTheDocument();
    expect(queryByTestId('snap-icon')).not.toBeInTheDocument();
  });

  it('renders an installed Snap', async () => {
    const { snap } = getMockSnap({ name: 'Foo Snap' });
    const { queryByText, queryByTestId } = await act(() =>
      render(
        <SnapAvatar snapName={snap.name} icon={snap.icon} isInstalled={true} />,
      ),
    );

    expect(queryByText('F')).toBeInTheDocument();
    expect(queryByTestId('snap-icon')).toBeInTheDocument();
  });
});
