import type { FunctionComponent } from 'react';

import { NoNotifications } from './NoNotifications';
import { Notification } from './Notification';
import { useSelector } from '../../../hooks';
import { getUpdatableSnaps } from '../../snaps';

export const NotificationsList: FunctionComponent = () => {
  const snaps = useSelector(getUpdatableSnaps);

  if (snaps.length === 0) {
    return <NoNotifications />;
  }

  return (
    <>
      {snaps.map((snap) => (
        <Notification key={`updatable-${snap.snapId}`} snap={snap} />
      ))}
    </>
  );
};
