import type { FunctionComponent } from 'react';
import { useEffect } from 'react';

import { useDispatch, useSelector } from '../../../hooks';
import { getUpdateAvailable } from '../../snaps';
import { acknowledgeUpdate, isUpdateAcknowledged } from '../store';

export type NotificationAcknowledgerProps = {
  snapId: string;
  version: string;
};

/**
 * This component is responsible for acknowledging a notification when it is
 * rendered. It's intended to be used in the Snap's page component.
 *
 * @param props - The component props.
 * @param props.snapId - The ID of the Snap.
 * @param props.version - The version of the Snap.
 * @returns The rendered component.
 */
export const NotificationAcknowledger: FunctionComponent<
  NotificationAcknowledgerProps
> = ({ snapId, version }) => {
  const dispatch = useDispatch();
  const updateAvailable = useSelector(getUpdateAvailable(snapId));
  const isAcknowledged = useSelector(isUpdateAcknowledged(snapId, version));

  useEffect(() => {
    if (updateAvailable && !isAcknowledged) {
      dispatch(acknowledgeUpdate({ snapId, version }));
    }
  }, [dispatch, snapId, version, updateAvailable, isAcknowledged]);

  return null;
};
