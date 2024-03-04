import { describe } from '@jest/globals';
import { act } from 'react-dom/test-utils';

import SnapPage from './{Snap.slug}';
import {
  render,
  getMockSnap,
  getMockPageContext,
} from '../../../utils/test-utils';

describe('Snap page', () => {
  it('renders', async () => {
    const { queryAllByText } = await act(() =>
      render(
        <SnapPage
          pageContext={getMockPageContext()}
          data={getMockSnap({ name: 'Foo Snap' })}
        />,
      ),
    );

    expect(queryAllByText('Foo Snap')).toHaveLength(3);
  });

  it('does not render the installation button if `onboard` is enabled', async () => {
    const { queryByText } = await act(() =>
      render(
        <SnapPage
          pageContext={getMockPageContext()}
          data={getMockSnap({ name: 'Foo Snap', onboard: true })}
        />,
      ),
    );

    expect(queryByText('Add to MetaMask')).not.toBeInTheDocument();
  });

  it('does not render the support section if the Snap has no support links', async () => {
    const { queryByText } = await act(() =>
      render(
        <SnapPage
          pageContext={getMockPageContext()}
          data={getMockSnap({ name: 'Foo Snap', support: {} })}
        />,
      ),
    );

    expect(queryByText('Contact')).not.toBeInTheDocument();
  });
});
