import { act } from '@testing-library/react';

import { NotificationsButton } from './NotificationsButton';
import { createStore } from '../../../store';
import {
  getMockSnap,
  getRequestMethodMock,
  render,
} from '../../../utils/test-utils';

describe('NotificationsButton', () => {
  it('renders', async () => {
    const { queryByLabelText } = await act(
      async () => await act(() => render(<NotificationsButton />)),
    );

    expect(queryByLabelText('Open notifications menu')).toBeInTheDocument();
    expect(queryByLabelText('Unread notification')).not.toBeInTheDocument();
  });

  it('renders a dot when there are unread notifications', async () => {
    const { snap } = getMockSnap();
    Object.assign(globalThis, 'window', {
      ethereum: getRequestMethodMock({
        /* eslint-disable @typescript-eslint/naming-convention */
        wallet_getSnaps: {
          [snap.snapId]: {
            name: snap.name,
            version: '0.1.0',
          },
        },
        web3_clientVersion: 'MetaMask/v11.0.0',
        /* eslint-enable @typescript-eslint/naming-convention */
      }),
    });

    const store = createStore({
      snaps: {
        snaps: [snap],
      },
    });

    const { queryByLabelText } = await act(
      async () => await act(() => render(<NotificationsButton />, store)),
    );

    expect(queryByLabelText('Unread notification')).toBeInTheDocument();
  });
});
