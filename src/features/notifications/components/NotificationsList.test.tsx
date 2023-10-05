import { Menu } from '@chakra-ui/react';
import { act } from '@testing-library/react';

import { NotificationsList } from './NotificationsList';
import { createStore } from '../../../store';
import {
  getMockSnap,
  getRequestMethodMock,
  render,
} from '../../../utils/test-utils';

describe('NotificationsList', () => {
  it('renders all notifications', async () => {
    const fooSnap = getMockSnap({ snapId: 'foo', name: 'foo' }).snap;
    const barSnap = getMockSnap({ snapId: 'bar', name: 'bar' }).snap;
    const bazSnap = getMockSnap({ snapId: 'baz', name: 'baz' }).snap;

    Object.assign(globalThis, 'window', {
      ethereum: getRequestMethodMock({
        /* eslint-disable @typescript-eslint/naming-convention */
        wallet_getSnaps: {
          [fooSnap.snapId]: {
            name: fooSnap.name,
            version: '0.1.0',
          },
          [barSnap.snapId]: {
            name: barSnap.name,
            version: '0.1.0',
          },
          [bazSnap.snapId]: {
            name: bazSnap.name,
            version: '0.1.0',
          },
        },
        web3_clientVersion: 'MetaMask/v11.0.0',
        /* eslint-enable @typescript-eslint/naming-convention */
      }),
    });

    const store = createStore({
      snaps: {
        snaps: [fooSnap, barSnap, bazSnap],
      },
    });

    const { queryByText } = await act(
      async () =>
        await act(() =>
          render(
            <Menu>
              <NotificationsList />
            </Menu>,
            store,
          ),
        ),
    );

    expect(queryByText('No notifications')).not.toBeInTheDocument();
    expect(queryByText(fooSnap.name)).toBeInTheDocument();
    expect(queryByText(barSnap.name)).toBeInTheDocument();
    expect(queryByText(bazSnap.name)).toBeInTheDocument();
  });
});
