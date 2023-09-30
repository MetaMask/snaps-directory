import { describe } from '@jest/globals';

import SnapPage, { Head } from './{Snap.slug}';
import { render } from '../../../utils/test-utils';
import {
  getMockSiteMetadata,
  getMockSnap,
} from '../../../utils/test-utils/queries';

describe('Snap page', () => {
  it('renders', () => {
    const { queryAllByText } = render(
      <SnapPage data={getMockSnap({ name: 'Foo Snap' })} />,
    );

    expect(queryAllByText('Foo Snap')).toHaveLength(3);
  });

  it('does not render the installation button if `onboard` is enabled', async () => {
    const { queryByText } = render(
      <SnapPage data={getMockSnap({ name: 'Foo Snap', onboard: true })} />,
    );

    expect(queryByText('Add to MetaMask')).toBeNull();
  });

  it('does not render the support section if the Snap has no support links', async () => {
    const { queryByText } = render(
      <SnapPage data={getMockSnap({ name: 'Foo Snap', support: {} })} />,
    );

    expect(queryByText('Contact')).toBeNull();
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
      ).not.toBeNull();
    });
  });
});
