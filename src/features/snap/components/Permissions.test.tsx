import { Permissions } from './Permissions';
import { getMockSnap, render } from '../../../utils/test-utils';

describe('Permissions', () => {
  it('renders the Snap permissions', () => {
    const { queryByText } = render(
      <Permissions
        snap={getMockSnap().snap}
        permissions={getMockSnap().snap.permissions}
      />,
    );

    expect(queryByText('Permissions by')).toBeInTheDocument();
    expect(
      queryByText('Allow websites to communicate with Snap'),
    ).toBeInTheDocument();
  });
});
