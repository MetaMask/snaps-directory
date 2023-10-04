import type { PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createSlice } from '@reduxjs/toolkit';

import type { ApplicationState } from '../../store';
import { getUpdatableSnaps } from '../snaps';

// We store both the `snapId` and `version`, to make sure the notification is
// shown, even if the user updated the Snap to a different version outside of
// the Snaps Directory.
export type UpdateNotification = {
  snapId: string;
  version: string;
};

export type NotificationsState = {
  acknowledgedUpdates: UpdateNotification[];
};

const initialState: NotificationsState = {
  acknowledgedUpdates: [],
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: (): NotificationsState => {
    if (typeof localStorage === 'undefined') {
      return initialState;
    }

    const state = localStorage.getItem('notifications');
    if (state) {
      return JSON.parse(state);
    }

    return initialState;
  },
  reducers: {
    acknowledgeUpdate: (state, action: PayloadAction<UpdateNotification>) => {
      state.acknowledgedUpdates.push(action.payload);
    },
    removeAcknowledgedUpdate: (state, action: PayloadAction<string>) => {
      state.acknowledgedUpdates = state.acknowledgedUpdates.filter(
        (update) => update.snapId !== action.payload,
      );
    },
  },
});

export const { acknowledgeUpdate, removeAcknowledgedUpdate } =
  notificationsSlice.actions;

export const getAcknowledgedUpdates = createSelector(
  (state: ApplicationState) => state.notifications,
  ({ acknowledgedUpdates }) => acknowledgedUpdates,
);

export const isUpdateAcknowledged = (snapId: string, version: string) =>
  createSelector(
    (state: ApplicationState) => state.notifications,
    ({ acknowledgedUpdates }) => {
      return acknowledgedUpdates.some(
        (update) => update.snapId === snapId && update.version === version,
      );
    },
  );

export const getUnacknowledgedUpdates = createSelector(
  (state: ApplicationState) => ({
    acknowledgedUpdates: getAcknowledgedUpdates(state),
    availableUpdates: getUpdatableSnaps(state),
  }),
  ({ acknowledgedUpdates, availableUpdates }) =>
    availableUpdates.filter(
      (update) =>
        !acknowledgedUpdates.some(
          (acknowledged) =>
            acknowledged.snapId === update.snapId &&
            acknowledged.version === update.latestVersion,
        ),
    ),
);
