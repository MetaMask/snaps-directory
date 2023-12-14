import { describe } from '@jest/globals';
import { act } from 'react-dom/test-utils';

import SnapPage, { Head } from './{Snap.slug}';
import {
  render,
  getMockSiteMetadata,
  getMockSnap,
} from '../../../utils/test-utils';

describe('Snap page', () => {
  it('renders', async () => {
    const { queryAllByText } = await act(() =>
      render(<SnapPage data={getMockSnap({ name: 'Foo Snap' })} />),
    );

    expect(queryAllByText('Foo Snap')).toHaveLength(2);
  });

  it('does not render the installation button if `onboard` is enabled', async () => {
    const { queryByText } = await act(() =>
      render(
        <SnapPage data={getMockSnap({ name: 'Foo Snap', onboard: true })} />,
      ),
    );

    expect(queryByText('Add to MetaMask')).not.toBeInTheDocument();
  });

  it('does not render the support section if the Snap has no support links', async () => {
    const { queryByText } = await act(() =>
      render(
        <SnapPage data={getMockSnap({ name: 'Foo Snap', support: {} })} />,
      ),
    );

    expect(queryByText('Contact')).not.toBeInTheDocument();
  });

  describe('Head', () => {
    it('has the correct title', () => {
      const { queryByText } = render(
        <Head
          data={{
            ...getMockSnap({ name: 'Foo Snap' }),
            ...getMockSiteMetadata(),
          }}
        />,
      );
      expect(
        queryByText('Foo Snap on the MetaMask Snaps Directory'),
      ).toBeInTheDocument();
    });
  });
});
