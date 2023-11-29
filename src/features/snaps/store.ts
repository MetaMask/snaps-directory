import type { PayloadAction } from '@reduxjs/toolkit';
import { createSelector, createSlice } from '@reduxjs/toolkit';
import semver from 'semver/preload';

import { getInstalledSnaps } from './api';
import type { ApplicationState } from '../../store';
import type { Fields } from '../../utils';

export type Snap = Fields<
  Queries.Snap,
  | 'id'
  | 'snapId'
  | 'name'
  | 'summary'
  | 'icon'
  | 'category'
  | 'gatsbyPath'
  | 'latestVersion'
  | 'downloads'
  | 'lastUpdated'
>;

export type SnapsState = {
  snaps: Snap[] | null;
};

const initialState: SnapsState = {
  snaps: null,
};

export const snapsSlice = createSlice({
  name: 'snaps',
  initialState,
  reducers: {
    setSnaps: (state, action: PayloadAction<Snap[]>) => {
      state.snaps = action.payload;
    },
  },
});

export const { setSnaps } = snapsSlice.actions;

export const getSnaps = createSelector(
  (state: ApplicationState) => state.snaps,
  ({ snaps }) => snaps,
);

export const getUpdateAvailable = (snapId: string) =>
  createSelector(
    (state: ApplicationState) => ({
      installedSnaps: getInstalledSnaps(state),
      snaps: getSnaps(state),
    }),
    ({ installedSnaps, snaps }) => {
      const installedVersion = installedSnaps?.[snapId]?.version;
      if (!installedVersion) {
        return false;
      }

      const snap = snaps?.find((item) => item.snapId === snapId);
      if (!snap) {
        return false;
      }

      return semver.gt(snap.latestVersion, installedVersion);
    },
  );

export const getUpdatableSnaps = createSelector(
  (state: ApplicationState) => ({
    snapIds: Object.keys(getInstalledSnaps(state)).filter((snapId) =>
      getUpdateAvailable(snapId)(state),
    ),
    snaps: getSnaps(state),
  }),
  ({ snapIds, snaps }) =>
    snapIds
      .map((snapId) => snaps?.find((item) => item.snapId === snapId))
      .filter(Boolean) as Snap[],
);
