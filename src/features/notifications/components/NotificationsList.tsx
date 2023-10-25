import type { FunctionComponent } from 'react';

import { useSelector } from '../../../hooks';
import { getUpdatableSnaps } from '../../snaps';
import { NoNotifications } from './NoNotifications';
import { Notification } from './Notification';

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
