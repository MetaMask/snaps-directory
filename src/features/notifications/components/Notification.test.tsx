import { Menu } from '@chakra-ui/react';

import { Notification } from './Notification';
import { createStore } from '../../../store';
import { getMockSnap, render } from '../../../utils/test-utils';

describe('Notification', () => {
  it('renders', () => {
    const { snap } = getMockSnap();
    const { queryByText, queryByLabelText } = render(
      <Menu>
        <Notification snap={snap} />
      </Menu>,
    );

    expect(queryByText(snap.name)).toBeInTheDocument();
    expect(
      queryByText(`Version ${snap.latestVersion} update available`),
    ).toBeInTheDocument();
    expect(queryByLabelText('Unread notification')).toBeInTheDocument();
  });

  it('renders without unread indicator', () => {
    const { snap } = getMockSnap();
    const { queryByLabelText } = render(
      <Menu>
        <Notification snap={snap} />
      </Menu>,
      createStore({
        notifications: {
          acknowledgedUpdates: [
            {
              snapId: snap.snapId,
              version: snap.latestVersion,
            },
          ],
        },
      }),
    );

    expect(queryByLabelText('Unread notification')).not.toBeInTheDocument();
  });

  it('renders the unread indicator if the acknowledged version is different', () => {
    const { snap } = getMockSnap();
    const { queryByLabelText } = render(
      <Menu>
        <Notification snap={snap} />
      </Menu>,
      createStore({
        notifications: {
          acknowledgedUpdates: [
            {
              snapId: snap.snapId,
              version: '0.1.0',
            },
          ],
        },
      }),
    );

    expect(queryByLabelText('Unread notification')).toBeInTheDocument();
  });
});
