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

  it('calls the default onClick handler when clicked if no onClick handler is provided', async () => {
    const { snap } = getMockSnap();
    const { getByRole } = await act(() => render(<SnapCard {...snap} />));

    expect(() => act(() => getByRole('link').click())).not.toThrow();
  });

  it('calls the onClick handler when clicked', async () => {
    const { snap } = getMockSnap();
    const onClick = jest.fn();

    const { getByRole } = await act(() =>
      render(<SnapCard {...snap} onClick={onClick} />),
    );

    act(() => getByRole('link').click());

    expect(onClick).toHaveBeenCalled();
  });

  it('renders an image', async () => {
    const { snap } = getMockSnap();
    const { getByTestId } = await act(() =>
      render(<SnapCard {...snap} image={true} />),
    );

    expect(getByTestId('snap-card-image')).toBeInTheDocument();
  });
});
